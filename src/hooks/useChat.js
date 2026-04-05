import { useState, useEffect } from 'react';
import { sendChatMessage } from '../services/chatService';

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem('User'));
  } catch {
    return null;
  }
}

function saveUser(data) {
  localStorage.setItem('User', JSON.stringify(data));
}

export function useChat(convoId, setChatHistory) {
  const [history, setHistory] = useState({});
  const [activeConvo, setActiveConvo] = useState({});
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    const stored = loadUser();
    if (!stored?.uid) {
      const fresh = { uid: crypto.randomUUID(), chats: [] };
      saveUser(fresh);
      setHistory(fresh);
    } else {
      setHistory(stored);
      setChatHistory(stored.chats);
    }
  }, []);

  useEffect(() => {
    if (!convoId) {
      setActiveConvo({});
      return;
    }
    const stored = loadUser();
    if (stored) {
      setHistory(stored);
      const found = stored.chats.find(c => c.cid === convoId);
      if (found) setActiveConvo(found);
    }
  }, [convoId]);

  useEffect(() => {
    if (history?.chats) setChatHistory(history.chats);
  }, [history]);

  async function submitMessage(text, navigate) {
    if (!text.trim()) return;

    let targetConvo;
    let targetId = convoId;

    if (!convoId) {
      const newConvo = { cid: crypto.randomUUID(), convo: [], aiConvo: [] };
      targetId = newConvo.cid;
      navigate(`/BotBry/${newConvo.cid}`);

      const withMessage = { ...newConvo, convo: [{ role: 'user', message: text }] };
      targetConvo = withMessage;

      setActiveConvo(withMessage);

      setHistory(prev => {
        const updated = { ...prev, chats: [...(prev.chats || []), withMessage] };
        saveUser(updated);
        return updated;
      });
    } else {
      const updated = {
        ...activeConvo,
        convo: [...(activeConvo.convo || []), { role: 'user', message: text }],
      };
      targetConvo = updated;
      setActiveConvo(updated);

      setHistory(prev => {
        const chats = prev.chats.map(c => (c.cid === convoId ? updated : c));
        const next = { ...prev, chats };
        saveUser(next);
        return next;
      });
    }

    setThinking(true);

    try {
      const data = await sendChatMessage({
        message: text,
        userId: history?.uid,
        history: targetConvo.aiConvo || [],
      });

      const withReply = {
        ...targetConvo,
        convo: [...targetConvo.convo, { role: 'bot', message: data.reply }],
        aiConvo: [...(targetConvo.aiConvo || []), ...data.chats],
      };

      setActiveConvo(withReply);

      setHistory(prev => {
        const chats = prev.chats.map(c => (c.cid === (targetId) ? withReply : c));
        const next = { ...prev, chats };
        saveUser(next);
        return next;
      });
    } catch {
      const withError = {
        ...targetConvo,
        convo: [...targetConvo.convo, { role: 'bot', message: 'Sorry, something went wrong. Please try again.' }],
      };
      setActiveConvo(withError);
    } finally {
      setThinking(false);
    }
  }

  function clearAllHistory() {
    localStorage.removeItem('User');
    setHistory({});
    setActiveConvo({});
    setChatHistory([]);
  }

  return { history, activeConvo, thinking, submitMessage, clearAllHistory };
}
