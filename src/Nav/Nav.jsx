import s from "./Nav.module.css"
import { context } from "../App"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"

function Nav() {
    const ctx = useContext(context), { tabs, scrollUp, lightMode, setLightMode } = useContext(context)
    const navigation = useNavigate()
    const [dropDown, setDropDown] = useState(false)

    useEffect(() => { console.log(ctx, context) }, [])

    return (
        <div className={lightMode ? s.nav : `${s.nav} ${s.darkNav}`}>
            <div className={s.left} onClick={()=>navigation("/")}>
                <img src="./icon/icon.png" alt="Bry Tech Logo" className={s.icon} />
                <h2 className={s.title}>
                    <span>Bry</span>
                    Tech
                </h2>
            </div>

            <div className={s.right}>
                <ul className={!dropDown ? s.tabs : `${s.dropDown}`}>
                    {
                        tabs.map((tab) => (
                            <>
                                <li
                                    className={tab.isSelected ? `${s.tab} ${s.selected}` : s.tab}
                                    onClick={() => {
                                        navigation(tab.path)
                                        scrollUp()
                                        setDropDown(false)
                                    }}>
                                    <i className={tab.icon}></i>
                                    <Link to={tab.path} >{tab.name}</Link>
                                    <hr />
                                </li>
                            </>
                        ))
                    }

                    <li onClick={() => { lightMode ? setLightMode(false) : setLightMode(true) }} className={s.themePreference}>
                        <p><img src={lightMode ? "./icon/light.png" : "./icon/dark.png"} /> <span>{lightMode ? "Light Mode" : "Dark Mode"}</span> </p>
                        <hr />
                    </li>
                </ul>
            </div>
            <button
                className={s.hamburger}
                onClick={() => { dropDown ? setDropDown(false) : setDropDown(true) }}>
                <i className={dropDown ? "fa fa-close" : "fa fa-bars"}></i>
            </button>
        </div>
    )
}

export default Nav