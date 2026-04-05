import { useEffect, useRef } from "react";
import { useApp } from "../../context/AppContext";
import HeroSection from "./HeroSection";
import ExpertiseSection from "./ExpertiseSection";
import Technologies from "./Technologies";
import MusicSection from "./MusicSection";
import s from "./About.module.css";

export default function About() {
  const { defineTab, wrapperRef } = useApp();
  const refs = {
    hero: useRef(null),
    expertise: useRef(null),
    tech: useRef(null),
    music: useRef(null),
  };

  useEffect(() => { defineTab("/About"); }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const sections = Object.values(refs).map(r => r.current).filter(Boolean);

    function handleScroll() {
      const top = wrapper.scrollTop;
      sections.forEach(el => {
        if (el) {
          el.classList.toggle(s.visible, top + 400 > el.offsetTop);
        }
      });
    }

    handleScroll();
    wrapper.addEventListener("scroll", handleScroll);
    return () => wrapper.removeEventListener("scroll", handleScroll);
  }, [wrapperRef]);

  return (
    <main className={s.about}>
      <HeroSection ref={refs.hero} />
      <ExpertiseSection ref={refs.expertise} />
      <Technologies ref={refs.tech} />
      <MusicSection ref={refs.music} />
    </main>
  );
}
