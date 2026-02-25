import express from "express";
HEAD
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

import dotenv from "dotenv";
import fetch from "node-fetch";
import cors from "cors";
cd24805abe9dfc7e1de89bfc7c1ab3cb26f9be76

dotenv.config();

const app = express();
HEAD
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Model AI Backend Running");
});

app.post("/api/chat", async (req, res) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: req.body.message }]
      })
    });


app.use(cors());
app.use(express.json());

/* ROOT */
app.get("/", (req, res) => {
  res.send("🚀 Model AI Backend Running (OpenRouter + HF)");
});

/* OPENROUTER CHAT */
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

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
cd24805abe9dfc7e1de89bfc7c1ab3cb26f9be76

    const data = await response.json();

    res.json({
      reply: data.choices?.[0]?.message?.content || "No response"
    });

  } catch (error) {
HEAD

    console.error(error);
cd24805abe9dfc7e1de89bfc7c1ab3cb26f9be76
    res.status(500).json({ reply: "Server error ❌" });
  }
});

HEAD

/* HUGGINGFACE IMAGE */
app.post("/api/generate-image", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: prompt })
      }
    );

    const imageBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(imageBuffer).toString("base64");

    res.json({
      image: `data:image/png;base64,${base64}`
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Image generation failed ❌" });
  }
});

cd24805abe9dfc7e1de89bfc7c1ab3cb26f9be76
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
HEAD
});

});
cd24805abe9dfc7e1de89bfc7c1ab3cb26f9be76
