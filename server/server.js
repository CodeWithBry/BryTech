import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
const supportedURLs = [
  "http://localhost:5173",
  "https://codewithbry.github.io",
  "https://codewithbry.github.io/BryTech/",
]

const personaPrompt = `
    You are Bot BryTech.
    Suggest the users about the best system unit that they can build when they ask.
    You must humanize the way you talk.
    You should talk casually.
    if you are coding or generating some code and informations, beautify your response in the UI or just simply make it like the GPTs response.
    Strictly, do not use or generate a table when explaining codes and other things!
    You can code any programming languages as well as providing tips to the users in hardware components.
    You provide details and informations about the hardware parts that the user ask you to explain.
`
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (supportedURLs.some((url) => origin.startsWith(url))) {
        callback(null, true);
      } else {
        console.warn("❌ Blocked CORS request from:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle preflight requests globally (Express 5-safe)
app.options(/.*/, cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("This is the backend!");
});

app.post("/chat", async (req, res) => {
    const { message, userId, history } = req.body;
    console.log(message, userId, history)
    const chats = {
        userId,
        chats: [...history],
    }
    chats.chats.push({ role: "user", parts: [{ text: message }] })
    try {
        const persona = { role: "model", parts: [{ text: personaPrompt }] };
        const chat = [persona, ...chats.chats];

        const result = await model.generateContent({ contents: chat });

        const reply =
            result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Hmm, di ko alam paano sagutin yan.";

        chats.chats.push({ role: "model", parts: [{ text: reply }] })
        res.json({ reply, chats: chats.chats })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            reply: "⚠️ Hindi ako makasagot ngayon. May problema sa server.",
            error: String(error?.message || error),
        });
    }

});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 BryTech server is running on port ${PORT}`);
    console.log("🌐 Allowed URLs:", supportedURLs);
});