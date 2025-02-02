const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai"); // Gemini API

const app = express();
app.use(cors());
app.use(bodyParser.json());

const gemini = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY");

app.post("/analyze", async (req, res) => {
    try {
        const userText = req.body.text;
        const model = gemini.getGenerativeModel({ model: "gemini-pro" });

        const prompt = Analyze the tone of the following message and reply accordingly: "${userText}";
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        res.json({ response: responseText });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));