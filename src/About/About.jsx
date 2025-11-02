import s from "./About.module.css"
import {context} from "../App"
import { useContext, useEffect } from "react";
import HeroSection from "./HeroSection/HeroSection";
import ExpertiseSection from "./ExpertiseSection/ExpertiseSection";
import Technologies from "./Technologies/Technologies";

function About() {
  const { defineTab, lightMode } = useContext(context);

  useEffect(() => {
    if (defineTab) {
      defineTab("/About")
    }
  }, [defineTab])

  return (
    <div className={lightMode ? s.about : `${s.about} ${s.darkAbout}`}>
      <HeroSection />
      <ExpertiseSection />
      <Technologies />
    </div>
  )
}

export default About