import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* Root Route */
app.get("/", (req, res) => {
  res.send("Model AI Server is Running 🚀");
});

/* Chat API */
app.post("/api/chat", async (req, res) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "user", content: req.body.message }
        ]
      })
    });

    const data = await response.json();

    res.json({
      reply: data.choices?.[0]?.message?.content || "No response"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* Start Server (IMPORTANT FIX) */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
