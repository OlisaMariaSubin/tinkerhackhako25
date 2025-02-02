const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Simulated database to store user training data
const userTrainingData = {};

// Replace with your actual Gemini API key
const GEMINI_API_KEY = "AIzaSyBM_Tk4oDmFglG4ySNNYt0ONIMwAfgKC-g";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=${GEMINI_API_KEY}`;

/**
 * TRAIN ENDPOINT - Stores user demo text safely
 */
app.post("/train", (req, res) => {
    const { userId, text } = req.body;

    if (!userId || !text || text.trim() === "") {
        return res.status(400).json({ error: "Invalid or empty training text." });
    }

    if (!userTrainingData[userId]) {
        userTrainingData[userId] = [];
    }

    // Clean text input to avoid duplicates and store safely
    const cleanedText = text.trim();
    if (!userTrainingData[userId].includes(cleanedText)) {
        userTrainingData[userId].push(cleanedText);
        res.json({ message: "Training successful!" });
    } else {
        res.json({ message: "This text has already been trained." });
    }
});

/**
 * CHAT ENDPOINT - Generates an AI response using trained text
 */
app.post("/chat", async (req, res) => {
    const { userId, text } = req.body;

    if (!userId || !text || text.trim() === "") {
        return res.status(400).json({ error: "Invalid or empty chat message." });
    }

    // Get user's trained text or fallback to default
    const trainingExamples = userTrainingData[userId]?.join(" ") || "Hey there! How can I assist you today?";

    // AI Prompt to generate response dynamically
    const prompt = `You are chatting with a user. The user typically speaks like this: "${trainingExamples}". Respond to their message: "${text}"`;

    try {
        const response = await axios.post(GEMINI_API_URL, {
            contents: [{ parts: [{ text: prompt }] }]
        });

        const botResponse =
            response.data.candidates?.[0]?.content?.parts?.[0]?.text || "I’m not sure how to respond.";

        res.json({ response: botResponse });
    } catch (error) {
        console.error("❌ AI Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to generate response from AI" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});