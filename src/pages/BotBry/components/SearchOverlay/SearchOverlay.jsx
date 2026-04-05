import { useState } from 'react';
import { Link } from 'react-router-dom';
import s from './SearchOverlay.module.css';

export default function SearchOverlay({ chatHistory, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  function search(value) {
    setQuery(value);
    if (!value.trim()) { setResults([]); return; }
    const found = [];
    chatHistory?.forEach(chat => {
      chat.convo?.forEach(msg => {
        if (msg.message?.toLowerCase().includes(value.toLowerCase())) {
          found.push({ cid: chat.cid, message: msg.message });
        }
      });
    });
    setResults(found);
  }

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.panel} onClick={e => e.stopPropagation()}>
        <div className={s.header}>
          <h2>Search Chats</h2>
          <button className={s.closeBtn} onClick={onClose}><i className="fa fa-times" /></button>
        </div>

        <div className={s.inputRow}>
          <i className="fa fa-search" />
          <input
            type="text"
            placeholder="Search in conversations…"
            value={query}
            onChange={e => search(e.target.value)}
            autoFocus
          />
          {query && <button className={s.clearBtn} onClick={() => search('')}><i className="fa fa-times" /></button>}
        </div>

        <div className={s.results}>
          {results.length === 0 && query && (
            <p className={s.empty}>No results for "{query}"</p>
          )}
          {results.map((r, i) => (
            <Link
              key={i}
              to={`/BotBry/${r.cid}`}
              className={s.result}
              onClick={onClose}
            >
              <i className="fas fa-comments" />
              <span>{r.message}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
