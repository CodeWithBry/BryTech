import s from "./Home.module.css"
import first from "./HeroSection/HeroSection.module.css"
import second from "./Products/Products.module.css"
import third from "./ChatInfo/ChatInfo.module.css"
import { context } from "../App"
import { useContext, useEffect } from "react"
import HeroSection from "./HeroSection/HeroSection";
import ChatInfo from "./ChatInfo/ChatInfo";
import Products from "./Products/Products";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

function Home({ hideComponent }) {
  const { defineTab, lightMode, wrapperRef } = useContext(context);

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
    <div className={lightMode ? s.home : `${s.home} ${s.darkHome}`} id={hideComponent ? `${s.Home} ${s.hideComponent}` : `${s.Home} ${s.animate}`}>
      <HeroSection />
      <Products />
      <ChatInfo />
    </div>
  )
}

export default Home