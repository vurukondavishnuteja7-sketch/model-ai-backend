const express = require("express");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   ROOT TEST
========================= */
app.get("/", (req, res) => {
  res.send("🚀 Model AI Backend Running (OpenRouter + HF)");
});

/* =========================
   🤖 OPENROUTER CHAT
========================= */
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ reply: "Message required" });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://modelai.online",
          "X-Title": "ModelAI"
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful AI assistant." },
            { role: "user", content: userMessage }
          ],
          temperature: 0.7
        })
      }
    );

    const data = await response.json();

    if (!data.choices) {
      console.log(data);
      return res.status(500).json({ reply: "OpenRouter error" });
    }

    res.json({
      reply: data.choices[0].message.content
    });

  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ reply: "Server error ❌" });
  }
});

/* =========================
   🖼 HUGGINGFACE IMAGE
========================= */
app.post("/api/generate-image", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt required" });
    }

    const response = await fetch(
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: prompt
        })
      }
    );

    const imageBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(imageBuffer).toString("base64");

    res.json({
      image: `data:image/png;base64,${base64}`
    });

  } catch (error) {
    console.error("Image Error:", error);
    res.status(500).json({ error: "Image generation failed ❌" });
  }
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
