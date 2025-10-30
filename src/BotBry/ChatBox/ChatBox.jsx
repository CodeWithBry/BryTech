import s from './ChatBox.module.css'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { useContext, useEffect, useRef, useState, } from 'react';
import { context } from '../../App';
import { useNavigate } from 'react-router-dom';

function ChatBox(props) {
  const { setChatHistory,
    convoId, setSideBarCollapsed } = props
  const { lightMode } = useContext(context)
  const convoEndRef = useRef(null)
  const navigation = useNavigate()
  const [currentConvoId, setCurrentConvoId] = useState(""); // Convo ID for each convo topics
  const [messageInput, setMessageInput] = useState(""); //Message Input From the UI
  const [chatMemory, setChatMemory] = useState({}); //
  const [history, setHistory] = useState({});
  const [thinking, setThinking] = useState(false)
  const [showCommand, setShowCommand] = useState(false)

  // 🌐 Automatically choose backend URL
  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:3000/chat" // Local backend
      : "https://brytech.onrender.com/chat"; // Render backend

  async function clearMemory() {
    const userId = localStorage.getItem("botBryanUserId");
    if (userId) {
      await fetch(API_URL.replace("/chat", "/clear-memory"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
    }
    localStorage.clear();
    setChatMemory([]);
  }

  function getHistory() {

  }

  function sendMessage(newMessage) {
    if (!messageInput.trim()) return;
    setSideBarCollapsed(true)
    if (chatMemory.convo == null && convoId == null) {
      const newChatHistory = {
        cid: crypto.randomUUID(),
        convo: [],/* {role, message} */
        aiConvo: []/* { cid: "cid", chats: [{ role: "user", parts: [{ text: message }] }] } */
      }
      let getFromHistory = { ...history }
      let updateHistory = { ...getFromHistory, chats: [...history?.chats, newChatHistory] }
      let updateChatsFromHistory = updateHistory.chats.filter((chat) =>
        chat.cid == newChatHistory.cid ? { ...chat, convo: { role: "user", message: newMessage } }
          : null
      )
      let chatObjectToDeliver = updateChatsFromHistory[0]

      setCurrentConvoId(newChatHistory.cid)
      navigation(`/BotBry/${newChatHistory.cid}`)

      setHistory(prev => {
        const setNewChat = { ...prev, chats: [...prev.chats, newChatHistory] }
        const setFirstMessage = setNewChat.chats.map((chat) => {
          if (chat?.cid == newChatHistory.cid) {
            const chatWithCorrectCID = [...chat.convo, { role: "user", message: newMessage }]
            setChatMemory((prev) => {
              return { ...prev, ...chat, convo: chatWithCorrectCID }
            });
            chatObjectToDeliver = { ...chat, convo: chatWithCorrectCID }
            return { ...chat, convo: chatWithCorrectCID }
          }

          return chat
        })
        const updatedHistory = { ...setNewChat, chats: [...setFirstMessage] }

        localStorage.setItem("User", JSON.stringify(updatedHistory)) //Make a new chat history with a first user message
        return updatedHistory
      })


      console.log(chatObjectToDeliver)
      getResponse(messageInput, chatObjectToDeliver);
    } else if (convoId) {
      let getFromHistory = { ...history }
      console.log(getFromHistory)
      let updateChatsFromHistory = getFromHistory.chats.filter((chat) =>
        chat.cid == convoId ? { ...chat, convo: { role: "user", message: newMessage } }
          : null
      )
      console.log(updateChatsFromHistory)
      let chatObjectToDeliver = updateChatsFromHistory[0]

      setHistory(prev => {
        const newUserInput = prev.chats.map((chat) => {
          if (chat?.cid == convoId) {
            const chatWithCorrectCID = [...chat.convo, { role: "user", message: newMessage }]
            setChatMemory((prev) => {
              return { ...prev, ...chat, convo: chatWithCorrectCID }
            });

            return { ...chat, convo: chatWithCorrectCID }
          }

          return chat
        })
        const updatedHistory = { ...prev, chats: [...newUserInput] }
        localStorage.setItem("User", JSON.stringify(updatedHistory)) //Make a new chat history with a first user message

        return updatedHistory
      })


      convoEndRef.current.scrollTop = convoEndRef.current.scrollHeight;
      getResponse(messageInput, chatObjectToDeliver);
    }

    setMessageInput("");
  }

  async function getResponse(msg, chatObject) {
    setThinking(true);
    const newChat = [...chatObject.aiConvo]
    const userId = history?.uid

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, userId, history: newChat }),
      });

      const data = await response.json();
      console.log(data)

      setChatMemory((prev) => {
        const newChat = [...prev.convo, { role: "bryan", message: data.reply }]
        return { ...prev, convo: newChat, aiConvo: [...prev.aiConvo, ...data.chats] }
      });

      setHistory(prev => {
        const updatedChats = prev.chats.map((convos) => {
          if (convos?.cid == chatObject.cid) {
            return {
              ...convos,
              aiConvo: [...convos.aiConvo, ...data.chats],
              convo: [...convos.convo, { role: "bryan", message: data.reply }]
            }
          }

          return convos
        })
        console.log(updatedChats)
        localStorage.setItem("User", JSON.stringify({ ...prev, chats: updatedChats }))
        setChatHistory(updatedChats)
        return { ...prev, chats: updatedChats }
      })

      convoEndRef.current.scrollTop = convoEndRef.current.scrollHeight;
      setThinking(false);
    } catch (err) {
      console.error("❌ Error sending message:", err);
      setChatMemory((prev) => [
        ...prev,
        { role: "bryan", message: "⚠️ Hindi ako makasagot ngayon. Try ulit mamaya!" },
      ]);
      setThinking(false);
    }
  }

  useEffect(() => {
    if (convoId) return
    const locStor = JSON.parse(localStorage.getItem("User"));

    if (locStor?.uid == null) {
      const userObject = {
        uid: crypto.randomUUID(),
        chats: []
      }
      localStorage.setItem("User", JSON.stringify(userObject))
      setHistory(userObject)
    } else {
      setHistory(locStor)
      setChatHistory(locStor.chats)
    }
  }, [convoId])

  useEffect(() => {
    if (convoId) {
      const locStor = JSON.parse(localStorage.getItem("User"));
      setHistory(locStor)
      if (locStor != null)
        locStor.chats.filter(chat => {
          if (chat.cid == convoId) {
            setChatMemory(chat)
            setCurrentConvoId(chat.cid)
          }
        })
    } else {
      setChatMemory({})
      setCurrentConvoId("")
    }
  }, [convoId])

  useEffect(() => {
    convoEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMemory?.convo?.length]);

  useEffect(() => {
    if (history) setChatHistory(history?.chats)
  }, [history])

  useEffect(() => {
    if (convoEndRef.current) {
      convoEndRef.current.scrollTop = convoEndRef.current.scrollHeight;
    }
  }, [convoEndRef.current, chatMemory])

  return (
    <div className={lightMode ? s.chatBox : `${s.chatBox} ${s.darkChatBox}`}>
      <header>
        <div>
          <button onClick={() => props?.sideBarCollapsed ? props?.setSideBarCollapsed(false) : props?.setSideBarCollapsed(true)}>
            <i className={`fas fa-sign-out-alt ${!props?.sideBarCollapsed && s.rotate}`} ></i>
            {props?.sideBarCollapsed ? "Show Menu" : "Hide Menu"}
          </button>
          <div className={showCommand ? `${s.command}` : `${s.command} ${s.unshowCommand}`}>
            <button onClick={clearMemory}>Delete This Convo</button>
            <button onClick={getHistory}>History</button>
          </div>
        </div>
      </header>

      <div className={s.chatBody}>

        {chatMemory.convo != null ? (
          <div className={s.convoContainer} ref={convoEndRef}>
            <ul className={s.convo}>
              {chatMemory?.convo?.map((res, i) => (
                <>
                  <li
                    key={i}
                    className={res.role === "user" ? s.user : s.bryan}
                  >

                    {res.role === "user" ? <img src="./icon/icon.png" alt="bot icon" /> : <img src="./icon/botIcon.png" alt="bot icon" />}
                    <span>{ }</span>
                    <div className={s.messageBox}>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeSanitize]}
                        components={{
                          code({ inline, children, ...props }) {
                            return inline ? (
                              <code className={s.inlineCode}>{children}</code>
                            ) : (
                              <pre className={s.codeBlock}>
                                <code {...props}>{children}</code>
                              </pre>
                            );
                          },
                          a({ href, children }) {
                            return (
                              <a href={href} target="_blank" rel="noopener noreferrer" className={s.link}>
                                {children}
                              </a>
                            );
                          },
                          strong({ children }) {
                            return <strong className={s.bold}>{children}</strong>;
                          },
                          em({ children }) {
                            return <em className={s.italic}>{children}</em>;
                          },
                        }}
                      >
                        {res.message}
                      </ReactMarkdown>
                    </div>
                  </li>

                </>

              ))}
              {
                thinking && <li className={s.thinking}>
                  <img src="./icon/botIcon.png" alt="bot icon" />
                  <div className={s.wrapper}>
                    <div className={s.dot}></div>
                    <div className={s.dot}></div>
                    <div className={s.dot}></div>
                  </div>
                </li>
              }
            </ul>
          </div>
        ) :
          <div className={s.botDescription}>
            <div className={s.icon}><img src="./icon/botIcon.png" alt="bot icon" /></div>
            <h1>BotBry 2.5 Flash</h1>
            <p>Hi! Ako si Bryan A. Pajarillaga — this chat bot is a digital version of me.</p>
          </div>
        }

        <div className={s.chatInput}>
          <input
            type="text"
            placeholder="Chat anything about Bryan..."
            value={messageInput}
            onChange={(e) => { setMessageInput(e.target.value) }}
            autoFocus="true"
          />
          <button
            onClick={() => sendMessage(messageInput)}
            className={s.sendButton}
          >
            Send <i className='	fa fa-send'></i>
          </button>
        </div>

      </div>
    </div>
  )
}

export default ChatBox