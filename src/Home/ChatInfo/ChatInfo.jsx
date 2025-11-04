import s from './ChatInfo.module.css'
import a from "../Home.module.css"
import { context } from "../../App"
import { useContext } from 'react'
import { Link } from 'react-router-dom'

function ChatInfo() {
    const { lightMode, scrollUp } = useContext(context)

    return (
        <div className={lightMode ? `${s.info} ${a.section}` : `${s.info} ${a.section} ${s.darkInfo}`}>
            <div className={`${s.left} ${a.left}`}>
                <div className={s.box}>
                    <h1>Need Assistance?</h1>
                    <p>Meet BotBry, your personal tech assistant! Ask anything about PC components, compatibility, or recommendations. BotBry is here to help you find the perfect parts for your build.</p>
                    <Link to={`/BotBry`} onClick={scrollUp}>
                        Try BotBry 
                        <i className="fa fa-commenting"></i>
                    </Link>
                </div>
            </div>
            <div className={`${s.right} ${a.right}`}>
                <img src="./Home/typing.gif" alt="typing.gif" />
            </div>
        </div>
    )
}

export default ChatInfo