import { Link, useNavigate } from 'react-router-dom'
import s from './SideBar.module.css'
import { useContext, useEffect } from 'react'
import { context } from '../../App'

function SideBar(props) {
    const { lightMode } = useContext(context)
    const navigation = useNavigate()

    function handleDropDown(index) {
        props?.setLinks(prev => prev.map((link, i) => {
            return index == i ? { ...link, showSubLinks: link.showSubLinks ? false : true } : { ...link }
        }))
    }

    function handleScrollToView(section) {
        const el = document.querySelector(`.${s.contentsWrapper}`)
        el.scrollTo({
            top: section.offsetTop,
            behavior: "smooth"
        })
    }
    return (
        <div className={props?.showSideBar
            ? (lightMode ? s.sideBar : `${s.sideBar} ${s.darkSideBar}`)
            : `${!lightMode && s.darkHideSideBar} ${s.hideSideBar}`}>
            {props?.links.map((mainLink, i) => {
                return <div className={s.mainLink} key={Math.random() * 1}>
                    <h3
                        className={mainLink.isSelected && s.selected}
                        onClick={() => {handleDropDown(i), navigation(`/Docs/${mainLink.relativeURL}`)}}>
                        <p>{mainLink.mainLink}</p>
                        <i className={mainLink.showSubLinks ? "fas fa-angle-up" : "fas fa-angle-down"}></i>
                    </h3>
                    <div className={mainLink.showSubLinks ? s.dropDown : s.hideDropDown}>
                        {
                            mainLink.subLinks.map((link, linkIndex) => {
                                return <a
                                    key={Math.random() * 1}
                                    onClick={() => {
                                        props?.sections.map((section, index) => {
                                            if (index == linkIndex) handleScrollToView(section)
                                        })
                                    }}
                                    href={`/BryTech/#/Docs${mainLink.relativeURL.length != 0 ? `/${mainLink.relativeURL}#` : "#"}${link.link}`}>
                                    <i className="fas fa-angle-right"></i> {link.part}
                                </a>
                            }
                            )
                        }
                    </div>


                </div>
            })}
            <button
                className={s.collapseSideBar}
                onClick={() => props?.showSideBar ? props.setShowSideBar(false) : props.setShowSideBar(true)}>
                <i className={props?.showSideBar ? "fas fa-angle-left" : "fas fa-angle-right"}></i>
            </button>
        </div>
    )
}

export default SideBar