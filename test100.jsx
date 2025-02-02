import React, { useState } from "react";
import axios from "axios";

function App() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");

    const sendMessage = async () => {
        if (!message.trim()) return;

        try {
            const res = await axios.post("http://localhost:5000/analyze", { text: message });
            setResponse(res.data.response);
        } catch (error) {
            console.error("Error:", error);
            setResponse("Error analyzing tone. Please try again.");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>AI Tone Chatbot</h1>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                rows="4"
                cols="50"
            />
            <br />
            <button onClick={sendMessage}>Send</button>
            <h3>Response:</h3>
            <p>{response}</p>
        </div>
    );
}

export default App;