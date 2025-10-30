import { useContext, useEffect, useState } from 'react'
import s from './SideBar.module.css'
import { context } from '../../App'
import { Link, useNavigate } from 'react-router-dom'

function SideBar(props) {
    const { sideBarCollapsed, setSideBarCollapsed,
        setShowClearHistory, chatHistory, convoId,
        setSearch } = props
    const { lightMode } = useContext(context)
    const navigation = useNavigate()
    const [getParams, setGetParams] = useState("")

    useEffect(() => {
        setGetParams(convoId ? convoId : "")

    }, [convoId])

    return (
        <div
            className={lightMode
                ? `${s.sideBar} ${sideBarCollapsed && s.collapsed}`
                : `${s.sideBar} ${s.darkSideBar} ${sideBarCollapsed && s.collapsed}`}>

            <div className={s.top}>
                <h1 onClick={() => { setSideBarCollapsed(prev => prev ? false : true) }}>
                    <img src="./icon/icon.png" alt="Web Icon" />
                    <i className='fas fa-sign-out-alt'></i>
                    {!sideBarCollapsed && <p>Bry{<span>Tech</span>}</p>}
                </h1>

                {!sideBarCollapsed && <button onClick={() => { navigation(`/BotBry`), setSideBarCollapsed(true) }}><i className='far fa-edit'></i></button>}
            </div>
            <div className={s.actions}>
                <button onClick={() => { setSearch(true) }}><i className='fas fa-search'></i> {!sideBarCollapsed && "Search Chat"}</button>
                <button onClick={() => { navigation(`/BotBry`), setSideBarCollapsed(true) }}><i className='far fa-edit'></i> {!sideBarCollapsed && "New Chat"}</button>
                <button onClick={() => setShowClearHistory(true)}><i className='fa fa-close'></i> {!sideBarCollapsed && "Delete History"}</button>
            </div>
            <div className={s.chatHistory}>
                {chatHistory?.map((chat, i) => {
                    return <Link
                        className={chat?.cid != getParams ? s.link : `${s.link} ${s.active}`}
                        onClick={()=>setSideBarCollapsed(true)}
                        to={`/BotBry/${chat.cid}`}
                        key={chat.cid}>
                        {!sideBarCollapsed && `${i + 1}.`}
                        <i className='fas fa-comments'></i>
                        {!sideBarCollapsed ? (<span>{chat.convo[0]?.message}</span>) : console.log(getParams.toString().toLocaleLowerCase())}
                    </Link>
                })}
            </div>
        </div>
    )
}

export default SideBar