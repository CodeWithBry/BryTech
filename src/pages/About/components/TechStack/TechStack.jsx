import { useState } from 'react';
import s from './TechStack.module.css';
import AnimationContainer from "../../../../components/AnimationContainer/AnimationContainer"

const TECHS = [
  { src: './About/React.svg', title: 'React JS', description: 'React JS is my go-to library for building fast, scalable, and interactive user interfaces. I specialize in creating reusable components and managing state effectively using hooks and context.' },
  { src: './About/HTML.png', title: 'HTML', description: 'I use HTML to build clean, semantic, and accessible structures that serve as the foundation for every website I create, following modern standards and best practices.' },
  { src: './About/CSS.svg', title: 'CSS', description: 'CSS is where design meets code. I craft responsive layouts, smooth animations, and modern visual styles that enhance user experience across all devices using Flexbox and Grid.' },
  { src: './About/JS.jpg', title: 'JavaScript', description: 'JavaScript powers interactivity on the web. I write clean, efficient, and modular code with experience in DOM manipulation, API integration, and asynchronous programming.' },
  { src: './About/TS.png', title: 'TypeScript', description: 'TypeScript adds structure and reliability to my JavaScript projects through static typing and better tooling, helping me catch errors early and maintain scalable codebases.' },
  { src: './About/Gemini.webp', title: 'Gemini API', description: 'I use Google\'s Gemini API to integrate AI-powered capabilities into my projects, from content generation to intelligent automation and context-aware features.' },
];

export default function TechStack() {
  const [active, setActive] = useState(TECHS[0]);

  return (
    <section className={`${s.section}`}>
      <AnimationContainer>
        <div className={s.header}>
          <p className={s.label}>Tools</p>
          <h2>My Technologies</h2>
        </div>
      </AnimationContainer>

      <div className={s.layout}>
        <div className={s.list}>
          {TECHS.map((tech, idx) => (
            <AnimationContainer key={tech.title} delay={idx * 150}>
              <button
                key={tech.title}
                className={`${s.item} ${active.title === tech.title ? s.active : ''}`}
                onClick={() => setActive(tech)}
              >
                <img src={tech.src} alt={tech.title} />
                <span>{tech.title}</span>
              </button>
            </AnimationContainer>
          ))}
        </div>

        <AnimationContainer delay={200}>
          <div className={s.detail}>
            <img src={active.src} alt={active.title} className={s.detailImg} />
            <h3>{active.title}</h3>
            <p>{active.description}</p>
            <a
              href="https://github.com/CodeWithBry"
              target="_blank"
              rel="noopener noreferrer"
              className={s.btn}
            >
              View GitHub <i className="fab fa-github" />
            </a>
          </div>
        </AnimationContainer>
      </div>
    </section>
  );
}
