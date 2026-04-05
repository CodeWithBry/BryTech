import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'https://codewithbry.github.io',
  'https://codewithbry.github.io/BryTech/',
];

const PERSONA = {
  role: 'model',
  parts: [{
    text: `You are BotBry, the official AI assistant for BryTech — a PC hardware e-commerce platform.
You help users with:
- PC build recommendations tailored to their budget and needs
- Hardware component explanations (CPU, GPU, RAM, motherboard, storage, PSU, cooling)
- Compatibility checks between components
- Tips on purchasing and upgrading hardware
- General coding and programming questions

Communication style:
- Casual, friendly, and approachable
- Humanized responses that feel natural, not robotic
- Use markdown for code blocks and structured lists
- Never use tables — use bullet lists or numbered steps instead
- Keep explanations clear and concise`,
  }],
};

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const allowed = ALLOWED_ORIGINS.some(o => origin.startsWith(o));
    if (allowed) return callback(null, true);
    console.warn('Blocked CORS request from:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options(/.*/, cors({ origin: true }));
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'BryTech AI Backend' });
});

app.post('/chat', async (req, res) => {
  const { message, userId, history } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  const safeHistory = Array.isArray(history) ? history : [];
  const userTurn = { role: 'user', parts: [{ text: message.trim() }] };
  const contents = [PERSONA, ...safeHistory, userTurn];

  try {
    const result = await model.generateContent({ contents });
    const reply =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Hmm, I'm not sure how to answer that. Try rephrasing?";

    const updatedHistory = [
      ...safeHistory,
      userTurn,
      { role: 'model', parts: [{ text: reply }] },
    ];

    return res.json({ reply, chats: updatedHistory });
  } catch (error) {
    console.error('Gemini API error:', error?.message || error);
    return res.status(500).json({
      reply: 'Something went wrong on my end. Please try again in a moment.',
      error: String(error?.message || error),
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`BryTech server running on port ${PORT}`);
  console.log('Allowed origins:', ALLOWED_ORIGINS);
});
