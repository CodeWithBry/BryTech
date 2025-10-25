import s from './Footer.module.css'
import { context } from "../App"
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

function Footer(props) {
    const { lightMode } = useContext
    const [infos] = useState([
        {
            head: "Developer Contacts",
            links: [
                { name: "Bryan A. Pajarillaga", link: "", icon: "fa fa-facebook-square" },
                { name: "bryanagustinpajarillaga@gmail.com", link: "", icon: "fa fa-envelope-square" },
                { name: "09150562345", link: "", icon: "fa fa-phone-square" }
            ]
        },
        {
            head: "Website's Features",
            links: [
                { name: "Home", link: "/", icon: "fa fa-home" },
                { name: "Shop", link: "/Shop", icon: "fa fa-shopping-bag" },
                { name: "Cart", link: "/Cart", icon: "fa fa-shopping-cart" },
                { name: "BotBry", link: "/BotBry", icon: "fa fa-commenting" },
                { name: "About", link: "/About", icon: "fa fa-info" },
                { name: "Docs", link: "/Docs", icon: "fa fa-code" },
            ]
        },
        {
            head: "Google Technologies",
            links: [
                { name: "Gemini", link: "gemini.google.com" },
                { name: "Fonts", link: "fonts.google.com" },
                { name: "Gemini API Docs", link: "ai.google.dev/gemini-api/docs" },
                { name: "Google.com", link: "google.com" },
            ]
        },
        {
            head: "Programming Technologies",
            links: [
                { name: "Javascript", link: "javascript.com" },
                { name: "HTML", link: "html.com" },
                { name: "CSS", link: "www.w3.org/Style/CSS/Overview.en.html" },
                { name: "React", link: "react.dev" },
                { name: "Express", link: "expressjs.com" },
                { name: "VS Code", link: "code.visualstudio.com" },
            ]
        }
    ])

    function scrollUp() {
        props.TopElement.current.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <footer className={lightMode ? s.footer : `${s.footer} ${s.darkFooter}`}>
            <header><img src="./icon/icon_and_title.jpg" /> <button onClick={scrollUp}>Scroll to Top <i className='fa fa-arrow-up'></i></button></header>
            <div className={s.top}>
                {infos.map((row) => {
                    return <div className={s.info}>
                        <h4>{row.head}</h4>
                        <ul key={row.head} className={s.lists}>
                            {row.links.map((link) => (
                                <li>{
                                    row.head == "Website's Features" ?
                                        <Link to={link.link} className={s.links}>
                                            {link?.icon && <i className={link.icon}></i>}{link.name}
                                        </Link> :
                                        <a href={"https://"+link.link} className={s.links}>
                                            {link?.icon && <i className={link.icon}></i>}{link.name}
                                        </a>
                                }</li>
                            ))}
                        </ul>
                    </div>
                })}
            </div>
            <div className={s.bottom}>
                <p> <img src="./icon/icon_and_title.jpg" alt="icon and title" /> ©  All Rights Reserved</p>
            </div>
        </footer>
    )
}

export default Footer