const bot = require("../lib/");
const { MessageType } = require("@adiwajshing/baileys");

// Your chatbot number in international format
const chatbotNumber = "254706369485@s.whatsapp.net";

bot.addCommand(
  { pattern: "vvv", fromMe: true, desc: "Anti viewOnce" },
  async (message, match) => {
    try {
      if (message.reply_message && (message.reply_message.imageMessage || message.reply_message.videoMessage)) {
        const isViewOnce = message.reply_message.imageMessage?.viewOnce || message.reply_message.videoMessage?.viewOnce;

        if (isViewOnce) {
          const mediaMessage = await message.reply_message.downloadMediaMessage();
          const messageType = message.reply_message.imageMessage ? MessageType.image : MessageType.video;

          // Send the media to your chatbot number
          await bot.sendMessage(chatbotNumber, mediaMessage, { quoted: message, messageType });
        }
      } else {
        console.log("Reply message does not contain expected imageMessage or videoMessage properties:", message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
);
