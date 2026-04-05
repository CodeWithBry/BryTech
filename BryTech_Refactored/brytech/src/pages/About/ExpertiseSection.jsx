import React from "react";
import s from "./ExpertiseSection.module.css";

const CARDS = [
  { icon: "fas fa-code", title: "Front-End", desc: "Building responsive, accessible, and visually engaging user interfaces with modern web technologies." },
  { icon: "fas fa-server", title: "Back-End", desc: "Developing efficient and scalable server-side applications with clean logic and API integration." },
  { icon: "fas fa-pencil-ruler", title: "UI/UX", desc: "Designing user-centered interfaces that balance usability, aesthetics, and functionality." },
  { icon: "fas fa-database", title: "Database", desc: "Managing and optimizing databases to ensure data accuracy, speed, and security." },
  { icon: "fas fa-lightbulb", title: "Problem Solving", desc: "Approaching challenges with analytical thinking and creative solutions across all layers of development." },
];

const ExpertiseSection = React.forwardRef(function ExpertiseSection(_, ref) {
  return (
    <section className={s.expertise} ref={ref}>
      <div className={s.heading}>
        <span className={s.tag}>What I Do</span>
        <h2>My Expertise</h2>
      </div>
      <div className={s.grid}>
        {CARDS.map(card => (
          <div className={s.card} key={card.title}>
            <div className={s.icon}><i className={card.icon} /></div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
});

export default ExpertiseSection;
