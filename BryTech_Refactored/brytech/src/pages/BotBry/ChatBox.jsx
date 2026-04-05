import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatMessages from "./ChatMessages";
import s from "./ChatBox.module.css";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/chat"
    : "https://brytech.onrender.com/chat";

function initUserStore() {
  const stored = JSON.parse(localStorage.getItem("User"));
  if (stored?.uid) return stored;
  const fresh = { uid: crypto.randomUUID(), chats: [] };
  localStorage.setItem("User", JSON.stringify(fresh));
  return fresh;
}

export default function ChatBox({ convoId, sidebarOpen, setSidebarOpen, setChatHistory }) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [store, setStore] = useState({});
  const [activeConvo, setActiveConvo] = useState(null);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  function persistStore(updated) {
    localStorage.setItem("User", JSON.stringify(updated));
    setStore(updated);
    setChatHistory(updated.chats);
  }

  useEffect(() => {
    const loaded = initUserStore();
    setStore(loaded);
    setChatHistory(loaded.chats);
  }, []);

  useEffect(() => {
    if (!store.chats) return;
    if (convoId) {
      const found = store.chats.find(c => c.cid === convoId) ?? null;
      setActiveConvo(found);
    } else {
      setActiveConvo(null);
    }
  }, [convoId, store]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeConvo?.messages?.length, thinking]);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    setSidebarOpen(false);
    setInput("");

    if (!convoId) {
      const cid = crypto.randomUUID();
      const newConvo = { cid, messages: [], aiHistory: [] };
      const updatedConvo = { ...newConvo, messages: [{ role: "user", text }] };

      const updated = { ...store, chats: [...(store.chats ?? []), updatedConvo] };
      persistStore(updated);
      setActiveConvo(updatedConvo);
      navigate(`/BotBry/${cid}`);
      fetchReply(text, updatedConvo, updated);
    } else {
      setStore(prev => {
        const updatedChats = prev.chats.map(c => {
          if (c.cid !== convoId) return c;
          const updatedConvo = { ...c, messages: [...c.messages, { role: "user", text }] };
          setActiveConvo(updatedConvo);
          fetchReply(text, updatedConvo, { ...prev, chats: prev.chats.map(ch => ch.cid === convoId ? updatedConvo : ch) });
          return updatedConvo;
        });
        const updated = { ...prev, chats: updatedChats };
        localStorage.setItem("User", JSON.stringify(updated));
        setChatHistory(updatedChats);
        return updated;
      });
    }
  }

  async function fetchReply(msg, convo, currentStore) {
    setThinking(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, userId: currentStore.uid, history: convo.aiHistory ?? [] }),
      });
      const data = await res.json();
      const replyMsg = { role: "assistant", text: data.reply };

      const updatedChats = currentStore.chats.map(c => {
        if (c.cid !== convo.cid) return c;
        const updated = {
          ...c,
          messages: [...c.messages, replyMsg],
          aiHistory: data.chats ?? [],
        };
        setActiveConvo(updated);
        return updated;
      });

      const updated = { ...currentStore, chats: updatedChats };
      persistStore(updated);
    } catch {
      const errMsg = { role: "assistant", text: "⚠️ Something went wrong. Please try again." };
      setStore(prev => {
        const updatedChats = prev.chats.map(c =>
          c.cid === convo.cid
            ? { ...c, messages: [...c.messages, errMsg] }
            : c
        );
        const updated = { ...prev, chats: updatedChats };
        localStorage.setItem("User", JSON.stringify(updated));
        const found = updatedChats.find(c => c.cid === convo.cid);
        if (found) setActiveConvo(found);
        setChatHistory(updatedChats);
        return updated;
      });
    } finally {
      setThinking(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className={s.chatBox}>
      <header className={s.header}>
        <button
          className={s.menuBtn}
          onClick={() => setSidebarOpen(p => !p)}
          title={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
        >
          <i className={`fas ${sidebarOpen ? "fa-times" : "fa-bars"}`} />
        </button>
        <span className={s.headerTitle}>BotBry 2.5 Flash</span>
      </header>

      <div className={s.body}>
        {activeConvo?.messages?.length > 0 ? (
          <ChatMessages messages={activeConvo.messages} thinking={thinking} ref={scrollRef} />
        ) : (
          <div className={s.welcome} onClick={() => setSidebarOpen(false)}>
            <div className={s.welcomeIcon}>
              <img src="./icon/botIcon.png" alt="BotBry" />
            </div>
            <h1>BotBry 2.5 Flash</h1>
            <p>Hi! I'm Bryan's AI assistant. Ask me about PC builds, hardware specs, or anything tech.</p>
          </div>
        )}
      </div>

      <div className={s.inputArea}>
        <input
          type="text"
          placeholder="Ask anything about PC hardware…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <button
          className={s.sendBtn}
          onClick={sendMessage}
          disabled={!input.trim() || thinking}
        >
          <i className="fa fa-paper-plane" />
        </button>
      </div>
    </div>
  );
}
