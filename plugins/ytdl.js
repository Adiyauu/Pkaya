const config = require('../config');
const { cmd } = require('../command');
const DY_SCRAP = require('@dark-yasiya/scrap');
const dy_scrap = new DY_SCRAP();

function replaceYouTubeID(url) {
    const regex = /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

cmd({
    pattern: "song",
    alias: ["play", "yt"],
    react: "🎵",
    desc: "Download Ytmp3",
    category: "download",
    use: ".song <Text or YT URL>",
    filename: __filename
}, async (conn, m, mek, { from, q, reply }) => {
    try {
        if (!q) return await reply("❌ Please provide a name or Youtube URL🤖");

        let id = q.startsWith("https://") ? replaceYouTubeID(q) : null;

        if (!id) {
            const searchResults = await dy_scrap.ytsearch(q);
            if (!searchResults?.results?.length) return await reply("❌ No results found!");
            id = searchResults.results[0].videoId;
        }

        const data = await dy_scrap.ytsearch(`https://youtube.com/watch?v=${id}`);
        if (!data?.results?.length) return await reply("❌ Failed to fetch video!");

        const { url, title, image, timestamp, ago, views, author } = data.results[0];

        let info = `*╭─「 `RAVINDU MD SONG DL 🎶` 」\n\n` +
        
            `🎵 *𝚃𝚒𝚝𝚕𝚎:* ${title || "Unknown"}\n` +
            `⏳ *𝙳𝚞𝚛𝚊𝚝𝚒𝚘𝚗:* ${timestamp || "Unknown"}\n` +
            `👀 *𝚅𝚒𝚎𝚠𝚜:* ${views || "Unknown"}\n` +
            `🌏 *𝚁𝚎𝚕𝚎𝚊𝚜𝚎 𝚊𝚐𝚘:* ${ago || "Unknown"}\n` +
            `👤 *𝙰𝚞𝚝𝚑𝚘𝚛:* ${author?.name || "Unknown"}\n` +
            `🖇 *𝚄𝚛𝚕:* ${url || "Unknown"}\n\n` +
            `🔽 *Reply before number:*\n` +
            `1 *Audio Type* 🎵\n` +
            `2 *Document Type* 📁\n\n` +
            
            `${config.FOOTER || "> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀᴠɪɴᴅᴜ-ᴍᴅ"}`;

        const sentMsg = await conn.sendMessage(from, { image: { url: image }, caption: info }, { quoted: mek });
        const messageID = sentMsg.key.id;
        await conn.sendMessage(from, { react: { text: '🎶', key: sentMsg.key } });

        // Listen for user reply only once!
        conn.ev.on('messages.upsert', async (messageUpdate) => { 
            try {
                const mekInfo = messageUpdate?.messages[0];
                if (!mekInfo?.message) return;

                const messageType = mekInfo?.message?.conversation || mekInfo?.message?.extendedTextMessage?.text;
                const isReplyToSentMsg = mekInfo?.message?.extendedTextMessage?.contextInfo?.stanzaId === messageID;

                if (!isReplyToSentMsg) return;

                let userReply = messageType.trim();
                let msg;
                let type;
                let response;
                
                if (userReply === "1") {
                    msg = await conn.sendMessage(from, { text: "⏳ Wait..." }, { quoted: mek });
                    response = await dy_scrap.ytmp3(`https://youtube.com/watch?v=${id}`);
                    let downloadUrl = response?.result?.download?.url;
                    if (!downloadUrl) return await reply("❌ Download link not found!");
                    type = { audio: { url: downloadUrl }, mimetype: "audio/mpeg" };
                    
                } else if (userReply === "2") {
                    msg = await conn.sendMessage(from, { text: "🚀*Uploading*" }, { quoted: mek });
                    const response = await dy_scrap.ytmp3(`https://youtube.com/watch?v=${id}`);
                    let downloadUrl = response?.result?.download?.url;
                    if (!downloadUrl) return await reply("❌ Download link not found!");
                    type = { document: { url: downloadUrl }, fileName: `${title}.mp3`, mimetype: "audio/mpeg", caption: title };
                    
                } else { 
                    return await reply("❌ Invalid Number! Reply with 1 or 2.");
                }

                await conn.sendMessage(from, type, { quoted: mek });
                await conn.sendMessage(from, { text: '✅ Media Upload Successful ✅', edit: msg.key });

            } catch (error) {
                console.error(error);
                await reply(`❌ *An error occurred while processing:* ${error.message || "Error!"}`);
            }
        });

    } catch (error) {
        console.error(error);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        await reply(`❌ *An error occurred:* ${error.message || "Error!"}`);
    }
});
                               
