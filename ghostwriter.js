const puppeteer = require("puppeteer");
const readlineSync = require("readline-sync");

(async () => {
  console.log("Launching GhostWriter...");

  // Launch browser
  const browser = await puppeteer.launch({
    headless: false, // Set to false to see the browser
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto("https://web.whatsapp.com");

  console.log("Please scan the QR code in WhatsApp Web and press Enter.");
  readlineSync.question(""); // Wait for user to scan QR code

  console.log("Monitoring chats for new messages...");

  while (true) {
    try {
      // Detect unread messages
      const unreadMessages = await page.$$(
        "span[aria-label*='unread message']"
      );

      if (unreadMessages.length > 0) {
        for (const msg of unreadMessages) {
          const contactName = await page.evaluate(
            (el) => el.closest("div[role='row']").innerText.split("\n")[0],
            msg
          );

          const choice = readlineSync.question(
            `Enable GhostWriter for ${contactName}? (yes/no): `
          );

          if (choice.toLowerCase() === "yes") {
            console.log(GhostWriter enabled for: ${contactName});
            await autoReply(page, contactName);
          }
        }
      }
    } catch (error) {
      console.error("Error detecting messages:", error);
    }

    await new Promise((r) => setTimeout(r, 5000)); // Check every 5 seconds
  }
})();

// Auto-reply function (Modify this for AI responses)
async function autoReply(page, contactName) {
  console.log(Auto-replying to ${contactName}...);

  await page.evaluate((name) => {
    const chat = [...document.querySelectorAll("span[title]")].find(
      (el) => el.title === name
    );
    if (chat) {
      chat.click();
      setTimeout(() => {
        document.querySelector("[contenteditable='true']").innerText =
          "Hey, I'm currently busy. Talk soon!";
        document.querySelector("button[aria-label='Send']").click();
      }, 1000);
    }
  }, contactName);
}