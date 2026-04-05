import { useEffect } from "react";
import { useApp } from "../../context/AppContext";
import HeroSection from "./HeroSection";
import FeaturedProducts from "./FeaturedProducts";
import ChatInfo from "./ChatInfo";
import s from "./Home.module.css";

export default function Home() {
  const { defineTab, wrapperRef } = useApp();

  useEffect(() => {
    defineTab("/");
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const sections = wrapper.querySelectorAll(`.${s.section}`);

    function handleScroll() {
      const scrollTop = wrapper.scrollTop;
      sections.forEach(el => {
        if (scrollTop + 400 > el.offsetTop) {
          el.classList.remove(s.fadeOut);
        } else if (scrollTop - 800 < el.offsetTop) {
          el.classList.add(s.fadeOut);
        }
      });
    }

    handleScroll();
    wrapper.addEventListener("scroll", handleScroll);
    return () => wrapper.removeEventListener("scroll", handleScroll);
  }, [wrapperRef]);

  return (
    <main className={s.home}>
      <HeroSection />
      <FeaturedProducts />
      <ChatInfo />
    </main>
  );
}
