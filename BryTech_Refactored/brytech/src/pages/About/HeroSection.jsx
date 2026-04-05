import React from "react";
import s from "./HeroSection.module.css";

const HeroSection = React.forwardRef(function HeroSection(_, ref) {
  return (
    <section className={s.hero} ref={ref}>
      <div className={s.left}>
        <p className={s.tag}>Hey, I'm Bryan</p>
        <h1>I Design <strong>UI/UX</strong> &amp; <strong>Develop Websites</strong></h1>
        <p className={s.bio}>
          Hi, I'm Bryan A. Pajarillaga — I build functional websites and stunning graphical UI experiences.
        </p>
        <a href="https://github.com/CodeWithBry" target="_blank" rel="noopener noreferrer" className={s.githubBtn}>
          My GitHub <i className="fab fa-github" />
        </a>
      </div>
      <div className={s.right}>
        <img src="./About/hero.png" alt="Bryan" />
      </div>
    </section>
  );
});

export default HeroSection;
