const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["status", "runtime", "uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "📟",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Generate system status message
        const status = `*👋 Hello ${pushname}, I' am alive now..!*
┃◈╭─────────────·๏
┃◈┃• *🔥Runtime*:  ${runtime(process.uptime())} 
┃◈┃• *📟 Ram*: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
┃◈┃• *🤖Platfom*: *Linux*
┃◈┃• *🧬 Version*: *1.0.0*
┃◈└───────────┈⊷-
╰──────────────┈⊷
*RAVINDU-MD Whatsapp bot*
 *created by Ravindu akash🔥*

 Repo: github.com/mrravindu/V1.com
 
> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀᴠɪɴᴅᴜ-ᴍᴅ`;

        // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: `https://i.ibb.co/kV09yDBR/5813.jpg` },  // Image URL
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363400917991342@newsletter',
                    newsletterName: 'RAVINDU_MD',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});