import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import s from "./ChatSidebar.module.css";

export default function ChatSidebar({ open, setOpen, chatHistory, convoId, onClearHistory, onSearch }) {
  const navigate = useNavigate();

  function startNew() {
    navigate("/BotBry");
    setOpen(false);
  }

  return (
    <aside className={`${s.sidebar} ${open ? s.open : s.collapsed}`}>
      <div className={s.header}>
        <div className={s.brand} onClick={() => setOpen(p => !p)}>
          <img src="./icon/icon.png" alt="BryTech" />
          {open && <span>Bry<em>Tech</em></span>}
        </div>
        {open && (
          <button className={s.newChat} onClick={startNew} title="New Chat">
            <i className="far fa-edit" />
          </button>
        )}
      </div>

      <div className={s.actions}>
        <button onClick={onSearch} title="Search">
          <i className="fa fa-search" />
          {open && <span>Search</span>}
        </button>
        <button onClick={startNew} title="New Chat">
          <i className="far fa-edit" />
          {open && <span>New Chat</span>}
        </button>
        <button onClick={onClearHistory} title="Clear History" className={s.danger}>
          <i className="fa fa-trash" />
          {open && <span>Clear History</span>}
        </button>
      </div>

      <nav className={s.history}>
        {chatHistory?.map((chat, i) => (
          <Link
            key={chat.cid}
            to={`/BotBry/${chat.cid}`}
            className={`${s.historyItem} ${chat.cid === convoId ? s.activeItem : ""}`}
            onClick={() => setOpen(false)}
            title={chat.convo[0]?.message}
          >
            <i className="fas fa-comments" />
            {open && <span>{chat.convo[0]?.message}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
