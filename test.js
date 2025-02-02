document.addEventListener("DOMContentLoaded", function () {
    const chatObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1 && node.innerText.includes("new message")) {
              const contactName = getContactName(node);
              promptGhosting(node, contactName);
            }
          });
        }
      });
    });
  
    chatObserver.observe(document.body, { childList: true, subtree: true });
  
    function getContactName(node) {
      let parent = node.closest(".chat"); // Adjust selector based on WhatsApp/Messenger DOM
      return parent ? parent.querySelector(".contact-name").innerText : "Unknown Contact";
    }
  
    function promptGhosting(node, contactName) {
      const chatBox = document.createElement("div");
      chatBox.innerHTML = `<div style="position: fixed; bottom: 10px; right: 10px; background: white; padding: 10px; border: 1px solid #ccc;">
        <p>Enable GhostWriter for ${contactName}?</p>
        <button id="yesGhost">Yes</button>
        <button id="noGhost">No</button>
      </div>`;
      document.body.appendChild(chatBox);
  
      document.getElementById("yesGhost").addEventListener("click", () => {
        enableGhosting(contactName);
        chatBox.remove();
      });
  
      document.getElementById("noGhost").addEventListener("click", () => {
        chatBox.remove();
      });
    }
  
    function enableGhosting(contactName) {
      console.log(GhostWriter enabled for: ${contactName});
      // Additional logic for AI responses can be added here
    }
  });