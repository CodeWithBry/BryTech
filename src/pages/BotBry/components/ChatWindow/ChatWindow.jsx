import { useEffect, useRef, useState } from 'react';
import MessageList from '../MessageList/MessageList';
import s from './ChatWindow.module.css';

export default function ChatWindow({ activeConvo, thinking, sidebarOpen, setSidebarOpen, onSend }) {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    setInput('');
    onSend(text);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeConvo?.cid]);

  const hasMessages = activeConvo?.convo?.length > 0;

  return (
    <div className={s.window}>
      <div className={s.topBar}>
        <button
          className={s.menuBtn}
          onClick={() => setSidebarOpen(p => !p)}
          aria-label="Toggle sidebar"
        >
          <i className={sidebarOpen ? 'fa fa-times' : 'fa fa-bars'} />
        </button>
        <span className={s.topTitle}>BotBry 2.5 Flash</span>
      </div>

      <div className={s.body}>
        {hasMessages ? (
          <MessageList messages={activeConvo.convo} thinking={thinking} />
        ) : (
          <div className={s.welcome}>
            <div className={s.welcomeIcon}>
              <img src="./icon/botIcon.png" alt="BotBry" />
            </div>
            <h1>BotBry 2.5 Flash</h1>
            <p>Your PC building assistant. Ask me about hardware, specs, builds, or anything tech.</p>
            <div className={s.suggestions}>
              {[
                'What CPU should I pair with RTX 4070?',
                'Best RAM for gaming under ₱3000?',
                'Explain DDR5 vs DDR4',
              ].map(s2 => (
                <button key={s2} className={s.suggestion} onClick={() => onSend(s2)}>
                  {s2}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={s.inputBar}>
        <div className={s.inputWrapper}>
          <input
            ref={inputRef}
            type="text"
            className={s.input}
            placeholder="Ask BotBry anything about PC hardware…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={thinking}
          />
          <button
            className={s.sendBtn}
            onClick={handleSend}
            disabled={!input.trim() || thinking}
            aria-label="Send"
          >
            <i className="fa fa-paper-plane" />
          </button>
        </div>
      </div>
    </div>
  );
}
