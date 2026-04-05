import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "https://codewithbry.github.io",
  "https://codewithbry.github.io/BryTech/",
];

const SYSTEM_PROMPT = `
You are BotBry, an AI tech assistant for BryTech — an e-commerce site for PC hardware.
Speak casually and in a friendly, human tone.
Help users choose and understand PC components: CPUs, RAMs, GPUs, keyboards, and full system builds.
When writing code or technical details, format your response with clear markdown.
Never use tables. Use bullet points, headers, or numbered lists instead.
Always be helpful, specific, and direct with hardware recommendations.
`.trim();

const PERSONA_SEED = { role: "model", parts: [{ text: SYSTEM_PROMPT }] };

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      const allowed = ALLOWED_ORIGINS.some(o => origin.startsWith(o));
      allowed
        ? callback(null, true)
        : callback(new Error(`CORS blocked: ${origin}`));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options(/.*/, cors({ origin: true }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "BryTech API" });
});

app.post("/chat", async (req, res) => {
  const { message, userId, history = [] } = req.body;

  if (!message?.trim()) {
    return res.status(400).json({ error: "Message is required." });
  }

  const incomingHistory = Array.isArray(history) ? history : [];
  const userTurn = { role: "user", parts: [{ text: message }] };
  const conversationChain = [PERSONA_SEED, ...incomingHistory, userTurn];

  try {
    const result = await model.generateContent({ contents: conversationChain });
    const reply =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "Hmm, I'm not sure how to answer that. Try rephrasing?";

    const updatedHistory = [
      ...incomingHistory,
      userTurn,
      { role: "model", parts: [{ text: reply }] },
    ];

    res.json({ reply, chats: updatedHistory });
  } catch (error) {
    console.error("Gemini API error:", error?.message ?? error);
    res.status(500).json({
      reply: "⚠️ I can't respond right now. Please try again in a moment.",
      error: error?.message ?? "Unknown server error",
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 BryTech server running on port ${PORT}`);
  console.log(`🌐 Allowed origins: ${ALLOWED_ORIGINS.join(", ")}`);
});
