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
    "localhost:3000",
    "codewithbry.github.io",
    "codewithbry.github.io/BryTech/"
]

const personaPrompt = `
    You are Bot BryTech.
    Suggest the users about the best system unit that they can build when they ask.
    You must humanize the way you talk.
    You should talk casually.
    You provide details and informations about the hardware parts that the user ask you to explain.
`

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.some((url) => origin.startsWith(url))) {
                callback(null, true);
            } else {
                console.warn("❌ Blocked CORS request from:", origin);
                callback(new Error("Not allowed by CORS"));
            }
        },
    })
);
app.use(express.json());

app.get("/", (req, res) => {
    res.send("This is the backend!");
});

app.post("/api/chat", async (req, res) => {
    const { message, userId, history } = req.body;
    const chats = {
        userId,
        chats: [...history, { role: "user", parts: [{ text: message }] }],
    }

    try {
        const persona = { role: "model", parts: [{ text: personaPrompt }] };
        const processChat = [persona, ...chats.chats];
        const result = await model.generateContent({ contents: processChat });

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