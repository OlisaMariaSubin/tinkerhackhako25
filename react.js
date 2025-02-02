import React, { useState } from "react";

// Navbar Component
const Navbar = () => {
  return (
    <nav style={navbarStyles}>
      <h1>GhostWriter</h1>
      <ul style={navListStyles}>
        <li><a href="#train" style={linkStyles}>Train</a></li>
        <li><a href="#test" style={linkStyles}>Test</a></li>
        <li><a href="#about" style={linkStyles}>About</a></li>
      </ul>
    </nav>
  );
};

// Main App Component
const GhostWriterApp = () => {
  const [mode, setMode] = useState("Casual"); // Response mode
  const [trainInput, setTrainInput] = useState(""); // User input for training
  const [testInput, setTestInput] = useState(""); // User input for testing
  const [trainedData, setTrainedData] = useState(""); // Stores user's texting habits
  const [response, setResponse] = useState(""); // AI-generated response

  // Simulate training the AI with user's texting habits
  const handleTrain = () => {
    setTrainedData(trainInput);
    setTrainInput("");
    console.log("Trained Data:", trainedData); // Log trained data to demonstrate usage
    alert("Texting habits trained successfully!");
  };

  // Simulate testing the AI with user input
  const handleTest = async () => {
    const simulatedResponse = await simulateAIResponse(testInput, mode);
    setResponse(simulatedResponse);
  };

  // Simulate an AI response (replace this with an actual API call)
  const simulateAIResponse = async (input, mode) => {
    const responses = {
      Casual: "Hey, what's up? 😄",
      Flirty: "You're looking fine today! 😘",
      Sarcastic: "Oh, great. Another message. 🙄",
      Formal: "Hello, how may I assist you?",
    };
    return responses[mode] || "I'm not sure how to respond.";
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        {/* Train Section */}
        <div style={styles.section}>
          <h2>Train GhostWriter</h2>
          <textarea
            value={trainInput}
            onChange={(e) => setTrainInput(e.target.value)}
            placeholder="Enter your texting habits (e.g., tone, slang, emojis)..."
            style={styles.textarea}
          />
          <button
            onClick={handleTrain}
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Train
          </button>
        </div>

        {/* Test Section */}
        <div style={styles.section}>
          <h2>Test GhostWriter</h2>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            style={styles.select}
          >
            <option value="Casual">Casual</option>
            <option value="Flirty">Flirty</option>
            <option value="Sarcastic">Sarcastic</option>
            <option value="Formal">Formal</option>
          </select>
          <textarea
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            placeholder="Type a message to test GhostWriter..."
            style={styles.textarea}
          />
          <button
            onClick={handleTest}
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Test
          </button>
          {response && (
            <div style={styles.response}>
              <strong>GhostWriter:</strong> {response}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  section: {
    marginBottom: "30px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  textarea: {
    width: "100%",
    height: "100px",
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
    transition: "background-color 0.3s ease",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  response: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#e9f5ff",
    borderRadius: "5px",
    border: "1px solid #007bff",
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

export default GhostWriterApp;