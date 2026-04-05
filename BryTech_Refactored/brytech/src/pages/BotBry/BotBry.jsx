import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import ChatSidebar from "./ChatSidebar";
import ChatBox from "./ChatBox";
import SearchOverlay from "./SearchOverlay";
import ConfirmDialog from "./ConfirmDialog";
import s from "./BotBry.module.css";

export default function BotBry() {
  const { defineTab } = useApp();
  const { convoId } = useParams();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [chatHistory, setChatHistory] = useState(
    () => JSON.parse(localStorage.getItem("User"))?.chats ?? []
  );

  useEffect(() => {
    defineTab("/BotBry");
  }, []);

  function handleDeleteHistory(confirmed) {
    if (confirmed) {
      localStorage.removeItem("User");
      setChatHistory([]);
      navigate("/BotBry");
    }
    setShowClearDialog(false);
    setSidebarOpen(false);
  }

  return (
    <div className={s.layout}>
      {showClearDialog && (
        <ConfirmDialog
          message="Clear all chat history?"
          onConfirm={() => handleDeleteHistory(true)}
          onCancel={() => handleDeleteHistory(false)}
        />
      )}

      {showSearch && (
        <SearchOverlay
          chatHistory={chatHistory}
          onClose={() => setShowSearch(false)}
        />
      )}

      <ChatSidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        chatHistory={chatHistory}
        convoId={convoId}
        onClearHistory={() => setShowClearDialog(true)}
        onSearch={() => setShowSearch(true)}
      />

      <ChatBox
        convoId={convoId}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setChatHistory={setChatHistory}
      />
    </div>
  );
}
