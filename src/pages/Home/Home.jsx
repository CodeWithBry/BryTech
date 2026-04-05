import s from "./Home.module.css"
import { AppContext } from "../../context/AppContext"
import { useContext, useEffect } from "react"
import HeroSection from "./HeroSection/HeroSection";
import ChatInfo from "./ChatInfo/ChatInfo";
import Products from "./Products/Products";

function Home({ hideComponent }) {
  const { defineTab, theme, wrapperRef } = useContext(AppContext);

  useEffect(() => {
    if (defineTab) {
      defineTab("/")
    }
  }, [defineTab])

  useEffect(() => {
    if (wrapperRef.current) {
      const wrapper = wrapperRef.current;


      function handleScroll() {
        const scrolledElements = wrapper.scrollTop 
        const sections = wrapper.querySelectorAll(`.${s.section}`);
        sections.forEach((element, i) => {
          if(scrolledElements + 400> element.offsetTop) {
            element.classList.remove(`${s.fade_section}`)
          }

          else if(scrolledElements-800 < element.offsetTop){
            element.classList.add(`${s.fade_section}`)
          }
          
        });

      }

      handleScroll(); // Run once on mount
      wrapper.addEventListener("scroll", handleScroll);
      return () => wrapper.removeEventListener("scroll", handleScroll);
    }
  }, [wrapperRef]);



  return (
    <div className={theme == "light" ? s.home : `${s.home} ${s.darkHome}`} id={hideComponent ? `${s.Home} ${s.hideComponent}` : `${s.Home} ${s.animate}`}>
      <HeroSection />
      <Products />
      <ChatInfo />
    </div>
  )
}

export default Home