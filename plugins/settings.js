const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")

cmd({
    pattern: "settings",
    alias: ["setting"],
    desc: "settings the bot",
    category: "owner",
    react: "⚙",
    filename: __filename


},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        let desc = ` ʀᴀᴠɪɴᴅᴜ ᴍᴅ ꜱᴇᴛᴛɪɴɢꜱ


╭══════════════════════○
┣━ *𝗪𝗢𝗥𝗞 𝗠𝗢𝗗𝗘 ✨*
> *1️⃣.1️⃣  Public Work*
> *1️⃣.2️⃣  Private Work*
╭══════════════════════○
┣━ *𝗪𝗘𝗟𝗖𝗢𝗠𝗘 ✨*
> *2️⃣.1️⃣ welcome on*
> *2️⃣.2️⃣ welcome off*
╭══════════════════════○
┣━ *𝗔𝗨𝗧𝗢 𝗧𝗬𝗣𝗜𝗡𝗚✨*
> *3️⃣.1️⃣ Auto typing on*
> *3️⃣.2️⃣ Auto typing Off*
╭══════════════════════○
┣━ *𝗔𝗨𝗧𝗢 𝗥𝗘𝗖𝗢𝗥𝗗𝗜𝗡𝗚 ✨*
> *4️⃣.1️⃣ Recoding On*
> *4️⃣.2️⃣ Recoding Off*
╭══════════════════════○
┣━ *𝗔𝗨𝗧𝗢 𝗦𝗘𝗘𝗡 𝗦𝗧𝗔𝗧𝗨𝗦✨*
> *5️⃣.1️⃣ Auto seen status on*
> *5️⃣.2️⃣ Auto seen status Off*
╭══════════════════════○
┣━ *𝗔𝗨𝗧𝗢 𝗥𝗘𝗔𝗖𝗧 ✨*
> *6️⃣.1️⃣ Auto react On*
> *6️⃣.2️⃣ Auto react Off*
╭══════════════════════○
┣━ *𝗠𝗦𝗚 𝗥𝗘𝗔𝗗 ✨*
> *7️⃣.1️⃣ Read Msg On*
> *7️⃣.2️⃣ Read Msg Off*
╭══════════════════════○
┣━ *𝗔𝗡𝗧𝗜 𝗟𝗜𝗡𝗞 ✨*
> *9️⃣.1️⃣ Anti Link On*
> *9️⃣.2️⃣ Anti Link Off*
> *9️⃣.3️⃣ Anti Link Remove*
╰═══════════════════════○


* *🔢 Reply Below This Number Change To RAVINDU-MD Bot Change Setting*

> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀᴠɪɴᴅᴜ-ᴍᴅ`;

        const vv = await conn.sendMessage(from, { image: { url: "https://i.ibb.co/kV09yDBR/5813.jpg"}, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1.1':
                        reply(".mode public" );
                        break;
                    case '1.2':               
                        reply(".mode private");
                        break;
                    case '1.3':               
                          reply(".update MODE:group");
                      break;
                    case '1.4':     
                        reply(".update MODE:inbox");
                      break;
                    case '2.1':     
                        reply(".welcome on");
                        break;
                    case '2.2':     
                        reply(".welcome off");
                    break;
                    case '3.1':    
                        reply(".auto-typing on");
                    break;
                    case '3.2':    
                        reply(".auto-typing off");
                    break;                    
                    case '4.1':    
                        reply(".auto-recording on");
                    break;
                    case '4.2':    
                        reply(".auto-recording off");
                    break;                                        
                    case '5.1':    
                        reply(".auto-seen on");
                    break;
                    case '5.2':    
                        reply(".auto-seen off");
                    break;                        
                    case '6.1':    
                        reply(".auto-react on");
                    break; 
                    case '6.2':    
                        reply(".auto-react off");
                    break;                       
                    case '7.1':    
                        reply(".update READ_MESSAGE:true");
                    break;
                    case '7.2':    
                        reply(".update READ_MESSAGE:false");
                    break;
                    case '8.1':    
                        reply(".update config.AUTO_REACT:true");
                    break;
                    case '8.2':    
                        reply(".update config.AUTO_REACT:false");
                    break;
                    case '9.1':    
                        reply(".antilink on");
                        reply(".antilink on");
                    break;
                    case '9.2':    
                        reply(".antilink off");
                        reply(".antilink off");
                    break;
                    case '9.3':    
                        reply(".update ANTI_LINK:false");
                        reply(".update ANTI_LINKK:false");
                    break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
