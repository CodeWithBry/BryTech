import { useEffect, useState } from 'react'
import s from './SideBar.module.css'
import { context } from '../../App'
import { Link } from 'react-router-dom'

function SideBar(props) {

    const { lightMode } = useState(context)
    return (
        <div 
            className={lightMode 
                ? `${s.sideBar} ${props?.sideBarCollapsed && s.collapsed}` 
                : `${s.sideBar} ${s.darkSideBar} ${props?.sideBarCollapsed && s.collapsed}`}>

            <div className={s.top}>
                <h1 onClick={()=>{props.setSideBarCollapsed(prev => prev ? false : true)}}>
                    <img src="./icon/icon.png" alt="Web Icon" />
                    <i className='fas fa-sign-out-alt'></i>
                    {!props.sideBarCollapsed && <p>Bry{<span>Tech</span>}</p>}
                </h1>

                {!props?.sideBarCollapsed && <button><i className='far fa-edit'></i></button>}
            </div>
            <div className={s.actions}>
                <button><i className='fas fa-search'></i> {!props?.sideBarCollapsed && "Search Chat"}</button>
                <button><i className='far fa-edit'></i> {!props?.sideBarCollapsed && "New Chat"}</button>
                <button><i className='fa fa-close'></i> {!props?.sideBarCollapsed && "Delete History"}</button>
            </div>
            <div className={s.chatHistory}>
                {/* {props?.chatHistory?.map((chat, i)=>{
                    return <Link 
                        className={s.link} 
                        key={chat.cid}>
                            {!props?.sideBarCollapsed && <span>History_{i}</span>}
                    </Link>
                })} */}
            </div>
        </div>
    )
}

export default SideBar