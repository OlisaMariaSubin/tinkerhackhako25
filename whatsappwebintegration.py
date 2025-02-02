import time
import os
import google.generativeai as genai
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# 🔹 Load API Key from .env file
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# 🔹 Setup Google Gemini AI
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-pro")

# 🔹 Setup Chrome WebDriver (Incognito Mode)
options = webdriver.ChromeOptions()
options.add_argument("--incognito")  # Open Chrome in Incognito Mode
options.add_argument("--disable-dev-shm-usage")  # Fix memory issues
options.add_argument("--no-sandbox")  # Prevent permission issues
options.add_argument("--disable-extensions")  # Avoid conflicts
options.add_argument("--disable-popup-blocking")  # Prevent issues with WhatsApp Web

# 🔹 Start Chrome Driver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# 🔹 Open WhatsApp Web
driver.get("https://web.whatsapp.com")
input("📱 Scan the QR code on WhatsApp Web and press Enter...")  # Wait for user to log in

def generate_ai_reply(message):
    """Generate an AI response using Google Gemini."""
    response = model.generate_content(f"Reply to this message in a natural way: {message}")
    return response.text.strip()

def check_new_messages():
    try:
        # 🔹 Find unread messages
        unread_chats = driver.find_elements(By.XPATH, "//span[@aria-label='Unread messages']")
        if unread_chats:
            for chat in unread_chats:
                chat.click()
                time.sleep(2)  # Wait for chat to open

                # 🔹 Get contact name
                contact_name = driver.find_element(By.XPATH, "//header//span[contains(@class,'selectable-text')]").text

                # 🔹 Get the last received message
                messages = driver.find_elements(By.XPATH, "//div[contains(@class,'message-in')]")
                if messages:
                    last_message = messages[-1].text
                    print(f"\n📩 New message from *{contact_name}*: {last_message}")

                    # 🔹 Ask user if they want to enable GhostWriter
                    user_input = input(f"Enable GhostWriter for {contact_name}? (yes/no): ").strip().lower()
                    if user_input == "yes":
                        print(f"🤖 Generating AI response for {contact_name}...")
                        ai_reply = generate_ai_reply(last_message)
                        print(f"✍ AI Reply: {ai_reply}")

                        # 🔹 Send AI reply
                        message_box = driver.find_element(By.XPATH, "//div[@contenteditable='true']")
                        message_box.send_keys(ai_reply)
                        message_box.send_keys(Keys.ENTER)

                        print(f"✅ GhostWriter sent a reply to {contact_name}!")
                    else:
                        print("⏳ GhostWriter skipped.")
    except Exception as e:
        print(f"⚠ Error: {e}")

# 🔄 Loop to check for new messages every 5 seconds
while True:
    check_new_messages()
    time.sleep(5)