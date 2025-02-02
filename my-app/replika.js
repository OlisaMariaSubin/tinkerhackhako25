import React, { useState } from "react";
import axios from "axios";

// Navbar Component
const Navbar = () => {
  return (
    <nav style={navbarStyles}>
      <h1>Replica</h1>
      <ul style={navListStyles}>
        <li><a href="#test" style={linkStyles}>Chat</a></li>
        <li><a href="#about" style={linkStyles}>About</a></li>
      </ul>
    </nav>
  );
};

// Main Chatbot Component
const ReplicaApp = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  // Send message and receive response
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message to chat history
    const newChatHistory = [...chatHistory, { sender: "You", text: userInput }];
    setChatHistory(newChatHistory);
    
    try {
      const res = await axios.post("http://127.0.0.1:8000/analyze/", { text: userInput });
      const botResponse = res.data.response;

      // Add AI response to chat history
      setChatHistory([...newChatHistory, { sender: "Replica", text: botResponse }]);
    } catch (error) {
      console.error("Error:", error);
      setChatHistory([...newChatHistory, { sender: "Replica", text: "Error: Unable to fetch response." }]);
    }

    setUserInput("");
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h2>Chat with Replica</h2>
        <div style={styles.chatBox}>
          {chatHistory.map((msg, index) => (
            <p key={index} style={msg.sender === "You" ? styles.userMessage : styles.botMessage}>
              <strong>{msg.sender}:</strong> {msg.text}
            </p>
          ))}
        </div>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type a message..."
          style={styles.textarea}
        />
        <button onClick={handleSendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  chatBox: {
    height: "300px",
    overflowY: "auto",
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    textAlign: "left",
  },
  textarea: {
    width: "100%",
    height: "80px",
    marginBottom: "10px",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
  userMessage: {
    textAlign: "right",
    backgroundColor: "#d1e7dd",
    padding: "8px",
    borderRadius: "5px",
    margin: "5px 0",
  },
  botMessage: {
    textAlign: "left",
    backgroundColor: "#e9f5ff",
    padding: "8px",
    borderRadius: "5px",
    margin: "5px 0",
  },
};

// Navbar Styles
const navbarStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
};

const navListStyles = {
  listStyle: "none",
  display: "flex",
  gap: "20px",
};

const linkStyles = {
  color: "#fff",
  textDecoration: "none",
  transition: "color 0.3s ease",
};

export default ReplicaApp;