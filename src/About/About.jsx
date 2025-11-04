import s from "./About.module.css"
import a from "./HeroSection/HeroSection.module.css"
import b from "./ExpertiseSection/ExpertiseSection.module.css"
import c from "./Technologies/Technologies.module.css"
import d from "./MusicSection/MusicSection.module.css"
import { context } from "../App"
import { useContext, useEffect, useRef } from "react";
import HeroSection from "./HeroSection/HeroSection";
import ExpertiseSection from "./ExpertiseSection/ExpertiseSection";
import Technologies from "./Technologies/Technologies";
import MusicSection from "./MusicSection/MusicSection"

function About() {
  const { defineTab, lightMode, wrapperRef } = useContext(context);
  const aboutRef = useRef();
  const heroSection = useRef()
  const expertise = useRef()
  const technologies = useRef()
  const music = useRef()

  useEffect(() => {
    if (defineTab) {
      defineTab("/About")
    }
  }, [defineTab])

  useEffect(() => {
    if (wrapperRef.current && heroSection.current && expertise.current && technologies.current && music.current) {
      const wrapper = wrapperRef.current;


      function handleScroll() {
        const scrolledElements = wrapper.scrollTop
        const sections = [heroSection.current, expertise.current, technologies.current, music.current]
        const styles = [a, b, c, d]
        sections.forEach((element, i) => {
          if (scrolledElements + 400> element.offsetTop) {
            element.classList.add(`${styles[i]?.show}`)
          }

          else if (scrolledElements-800 < element.offsetTop) {
            element.classList.remove(`${styles[i]?.show}`)
          }

        });

      }

      handleScroll(); // Run once on mount
      wrapper.addEventListener("scroll", handleScroll);
      return () => wrapper.removeEventListener("scroll", handleScroll);
    }
  }, [wrapperRef.current, heroSection.current, expertise.current, technologies.current, music.current]);

  return (
    <div className={lightMode ? s.about : `${s.about} ${s.darkAbout}`} ref={aboutRef}>
      <HeroSection ref={heroSection}/>
      <ExpertiseSection ref={expertise}/>
      <Technologies ref={technologies}/>
      <MusicSection ref={music}/>
    </div>
  )
}

export default About