import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useChat } from '../../hooks/useChat';
import Sidebar from './components/Sidebar/Sidebar';
import ChatWindow from './components/ChatWindow/ChatWindow';
import SearchOverlay from './components/SearchOverlay/SearchOverlay';
import s from './BotBry.module.css';

export default function BotBry() {
  const { defineTab, showModal } = useContext(AppContext);
  const { convoId } = useParams();
  const navigate = useNavigate();

  const [chatHistory, setChatHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { activeConvo, thinking, submitMessage, clearAllHistory } = useChat(convoId, setChatHistory);

  useEffect(() => { defineTab('/BotBry'); }, []);

  function handleClearHistory() {
    showModal({
      title: 'Clear All Conversations',
      message: 'This will permanently delete all your chat history. This cannot be undone.',
      icon: 'fa fa-trash',
      confirmLabel: 'Clear History',
      cancelLabel: 'Cancel',
      variant: 'danger',
      onConfirm: () => {
        clearAllHistory();
        navigate('/BotBry');
        setSidebarOpen(false);
      },
    });
  }

  async function handleSend(text) {
    await submitMessage(text, navigate);
  }

  return (
    <div className={s.layout}>
      {searchOpen && (
        <SearchOverlay
          chatHistory={chatHistory}
          onClose={() => setSearchOpen(false)}
        />
      )}

      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        chatHistory={chatHistory}
        activeConvoId={convoId}
        onNewChat={() => { navigate('/BotBry'); setSidebarOpen(false); }}
        onSearch={() => { setSearchOpen(true); setSidebarOpen(false); }}
        onClearHistory={handleClearHistory}
      />

      <ChatWindow
        activeConvo={activeConvo}
        thinking={thinking}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onSend={handleSend}
      />
    </div>
  );
}
