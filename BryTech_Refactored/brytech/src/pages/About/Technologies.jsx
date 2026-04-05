import React from "react";
import s from "./Technologies.module.css";

const STACK = [
  { src: "./About/React.svg", title: "React JS", desc: "My go-to library for fast, scalable, and interactive UIs using hooks and context." },
  { src: "./About/HTML.png", title: "HTML", desc: "Clean, semantic, and accessible markup that serves as the foundation for every project." },
  { src: "./About/CSS.svg", title: "CSS", desc: "Crafting responsive layouts, smooth animations, and modern styles across all devices." },
  { src: "./About/JS.jpg", title: "JavaScript", desc: "Writing clean, modular code for DOM manipulation, API integration, and async programming." },
  { src: "./About/TS.png", title: "TypeScript", desc: "Adding structure and reliability to JavaScript projects with static typing and better tooling." },
  { src: "./About/Gemini.webp", title: "Gemini API", desc: "Integrating AI-powered capabilities for intelligent and context-aware features." },
];

const Technologies = React.forwardRef(function Technologies(_, ref) {
  return (
    <section className={s.tech} ref={ref}>
      <div className={s.heading}>
        <span className={s.tag}>Tools I Use</span>
        <h2>My Technologies</h2>
      </div>
      <div className={s.grid}>
        {STACK.map(item => (
          <div className={s.card} key={item.title}>
            <div className={s.imgWrap}>
              <img src={item.src} alt={item.title} />
            </div>
            <div className={s.content}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <a href="https://github.com/CodeWithBry" target="_blank" rel="noopener noreferrer">
                View GitHub <i className="fab fa-github" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default Technologies;
