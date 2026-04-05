import { Link } from 'react-router-dom';
import s from './Sidebar.module.css';

export default function Sidebar({ open, setOpen, chatHistory, activeConvoId, onNewChat, onSearch, onClearHistory }) {
  return (
    <>
      {/* {open && <div className={s.backdrop} onClick={() => setOpen(false)} />} */}

      <aside className={`${s.sidebar} ${open ? s.open : s.collapsed}`}>
        <div className={s.header}>
          <div className={s.brand}>
            <img src="./icon/icon.png" alt="BryTech" />
            {open && <span>Bry<em>Tech</em></span>}
          </div>
          <button className={s.closeBtn} onClick={() => setOpen(false)} aria-label="Close sidebar">
            <i className="fa fa-times" />
          </button>
        </div>

        <div className={s.actions}>
          <button className={s.actionBtn} onClick={onNewChat}>
            <i className="far fa-edit" />
            {open && <span>New Chat</span>}
          </button>
          <button className={s.actionBtn} onClick={onSearch}>
            <i className="fa fa-search" />
            {open && <span>Search</span>}
          </button>
          <button className={`${s.actionBtn} ${s.danger}`} onClick={onClearHistory}>
            <i className="fa fa-trash" />
            {open && <span>Clear History</span>}
          </button>
        </div>

        <div className={s.history}>
          <p className={s.historyLabel}>{open && "Recent Chats"}</p>
          {chatHistory?.length === 0 && (
            <p className={s.empty}>No conversations yet.</p>
          )}
          {chatHistory?.map((chat, i) => (
            <Link
              key={chat.cid}
              to={`/BotBry/${chat.cid}`}
              className={`${s.historyItem} ${chat.cid === activeConvoId ? s.active : ''}`}
              onClick={() => setOpen(false)}
            >
              <i className="fas fa-comments" />
              <span className={s.historyText}>
                {chat.convo?.[0]?.message || `Chat ${i + 1}`}
              </span>
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}
