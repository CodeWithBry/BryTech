import s from './BotBry.module.css';
import { useContext, useEffect, useRef, useState, } from 'react';
import { context } from '../App';
import ChatBox from './ChatBox/ChatBox';
import SideBar from './SideBar/SideBar';
import { useParams } from 'react-router-dom';


function BotBry() {
  const {defineTab} = useContext(context)
  const {convoId} = useParams()
  const [sideBarCollapsed, setSideBarCollapsed] = useState(true) //minimize sidebar if true

  const [chatHistory, setChatHistory] = useState(JSON.parse(localStorage.getItem("User"))?.chats)


  useEffect(()=>{
    defineTab("/BotBry")
  }, [])

  
  return (
    <div className={s.chatWrapper}>
      <SideBar 
        chatHistory={chatHistory} 
        sideBarCollapsed={sideBarCollapsed} setSideBarCollapsed={setSideBarCollapsed}/>
      <ChatBox chatHistory={chatHistory} setChatHistory={setChatHistory} convoId={convoId}/>
    </div>
  );

}

export default BotBry;