import { useState } from "react";
import { Link } from "react-router-dom";
import s from "./SearchOverlay.module.css";

export default function SearchOverlay({ chatHistory, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  function runSearch(input) {
    if (!input.trim()) { setResults([]); return; }
    const q = input.toLowerCase();
    const found = [];
    chatHistory?.forEach(chat => {
      chat.messages?.forEach(msg => {
        if (msg.text?.toLowerCase().includes(q)) {
          found.push({ cid: chat.cid, text: msg.text });
        }
      });
    });
    setResults(found);
  }

  function handleChange(e) {
    setQuery(e.target.value);
    runSearch(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") onClose();
  }

  return (
    <div className={s.overlay}>
      <div className={s.panel}>
        <div className={s.header}>
          <h2><span>Search</span> Chats</h2>
          <button onClick={onClose}><i className="fa fa-times" /></button>
        </div>

        <div className={s.inputWrap}>
          <i className="fa fa-search" />
          <input
            type="text"
            placeholder="Search conversations…"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          {query && (
            <button className={s.clear} onClick={() => { setQuery(""); setResults([]); }}>
              <i className="fa fa-times" />
            </button>
          )}
        </div>

        <div className={s.results}>
          {results.length === 0 && query && (
            <p className={s.empty}>No results found.</p>
          )}
          {results.map((r, i) => (
            <Link
              key={i}
              to={`/BotBry/${r.cid}`}
              className={s.result}
              onClick={onClose}
            >
              <i className="fa fa-comment" />
              <span>{r.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
