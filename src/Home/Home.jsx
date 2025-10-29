import s from "./Home.module.css"
import {context} from "../App"
import { useContext, useEffect } from "react"
import HeroSection from "./HeroSection/HeroSection";
import ChatInfo from "./ChatInfo/ChatInfo";
import Products from "./Products/Products";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

function Home() {
  const {defineTab, lightMode} = useContext(context);

  useEffect(()=>{
    if(defineTab) {
      defineTab("/")
    }
  }, [defineTab])

  return (
    <div className={lightMode ? s.home : `${s.home} ${s.darkHome}`}>
      <Breadcrumb />
      <HeroSection />
      <Products />
      <ChatInfo />
    </div>
  )
}

export default Home