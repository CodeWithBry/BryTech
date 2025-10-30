import s from './BotBry.module.css';
import { useContext, useEffect, useRef, useState, } from 'react';
import { context } from '../App';
import ChatBox from './ChatBox/ChatBox';
import SideBar from './SideBar/SideBar';
import { useNavigate, useParams } from 'react-router-dom';
import ClearHistory from './ClearHistory/ClearHistory';
import Search from './Search/Search';


function BotBry() {
  const { defineTab } = useContext(context)
  const { convoId } = useParams()
  const navigation = useNavigate()
  const [sideBarCollapsed, setSideBarCollapsed] = useState(true) //minimize sidebar if true
  const [showClearHistory, setShowClearHistory] = useState(false)
  const [search, setSearch] = useState(false)
  const [chatHistory, setChatHistory] = useState(JSON.parse(localStorage.getItem("User"))?.chats)

  function deleteHistory(bool) {
    bool ? localStorage.removeItem("User") : console.log("Canceled")
    setShowClearHistory(false)
    setSideBarCollapsed(true)
    navigation("/BotBry")
    if(bool)window.location.reload()
  }

  useEffect(() => {
    defineTab("/BotBry")
  }, [])

  useEffect(()=>{
    console.log(chatHistory)
  }, [chatHistory])

  return (
    <div className={s.chatWrapper}>
      <ClearHistory
      deleteHistory={deleteHistory}
        showClearHistory={showClearHistory} setShowClearHistory={setShowClearHistory} />
      <Search search={search} setSearch={setSearch} chatHistory={chatHistory} setSideBarCollapsed={setSideBarCollapsed}/>
      <SideBar
        chatHistory={chatHistory}
        sideBarCollapsed={sideBarCollapsed} setSideBarCollapsed={setSideBarCollapsed}
        setShowClearHistory={setShowClearHistory} convoId={convoId} setSearch={setSearch} />
      <ChatBox
        chatHistory={chatHistory} setChatHistory={setChatHistory}
        convoId={convoId}
        sideBarCollapsed={sideBarCollapsed} setSideBarCollapsed={setSideBarCollapsed} />
    </div>
  );

}

export default BotBry;