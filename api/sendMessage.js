// api/sendMessage.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ ok: false, error: "Missing text" });
    }

    // Ambil token & chat_id dari environment variables di Vercel
    const botToken = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

    if (!botToken || !chatId) {
      return res.status(500).json({ ok: false, error: "Missing bot credentials" });
    }

    const telegramURL = https://api.telegram.org/bot${botToken}/sendMessage;

    // Kirim ke Telegram API
    const telegramRes = await fetch(telegramURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML"
      }),
    });

    const data = await telegramRes.json();

    if (!telegramRes.ok) {
      return res.status(502).json({ ok: false, error: "Telegram API error", details: data });
    }

    return res.status(200).json({ ok: true, data });
  } catch (err) {
    console.error("sendMessage error:", err);
    return res.status(500).json({ ok: false, error: "Internal server error" });
  }
}
