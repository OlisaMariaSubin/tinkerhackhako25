from fastapi import FastAPI
from pydantic import BaseModel
import google.generativeai as genai

# Initialize the FastAPI app
app = FastAPI()

# Replace this with your Gemini API key
GEMINI_API_KEY = "AIzaSyBM_Tk4oDmFglG4ySNNYt0ONIMwAfgKC-g"

# Configure Gemini API key
genai.configure(api_key=GEMINI_API_KEY)

# Define a request model
class MessageRequest(BaseModel):
    user_message: str
    chat_style: str  # Example: "casual", "formal", "funny"

# Function to generate reply using Gemini
def generate_reply(user_message: str, chat_style: str):
    # Set the model
    model = genai.GenerativeModel("gemini-1.5-flash")
    
    # Construct the prompt with the provided rules
    prompt = (
        "Please respond with only the necessary output based on the user query.\n"
        "For predefined commands, respond with the corresponding response code as defined:\n"
        "close = close\n"
        "add a face = add\n"
        "scan a face = scan\n"
        "time = time\n"
        "open smart lens = lens\n"
        "For all other queries, respond with only the direct output of the query without any additional explanation.\n"
        "If any question is asked, give a brief answer.\n"
        "If any error is encountered, return 'error'. Don't explain the error.\n"
        f"This is the user's query: '{user_message}'\n"
        "Provide only the direct response to the query above."
    )
    
    # Generate a response using Gemini model
    response = model.generate_content(prompt)
    
    # Extract the text of the response
    return response.text.strip()

# API endpoint to handle messages
@app.post("/generate_reply/")
def get_reply(request: MessageRequest):
    ai_response = generate_reply(request.user_message, request.chat_style)
    return {"reply": ai_response}