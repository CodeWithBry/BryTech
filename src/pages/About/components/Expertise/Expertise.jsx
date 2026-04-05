import AnimationContainer from '../../../../components/AnimationContainer/AnimationContainer';
import s from './Expertise.module.css';

const SKILLS = [
  { icon: 'fas fa-code', title: 'Front-End', description: 'Building responsive, accessible, and visually engaging user interfaces with modern web technologies.' },
  { icon: 'fas fa-server', title: 'Back-End', description: 'Developing efficient and scalable server-side applications with clean logic and API integration.' },
  { icon: 'fas fa-pencil-ruler', title: 'UI/UX', description: 'Designing user-centered interfaces that balance usability, aesthetics, and functionality.' },
  { icon: 'fas fa-database', title: 'Database', description: 'Managing and optimizing databases to ensure data accuracy, speed, and security.' },
  { icon: 'fas fa-lightbulb', title: 'Problem Solving', description: 'Analyzing complex challenges and creating effective solutions through critical thinking.' },
  { icon: 'fas fa-square-root-alt', title: 'Math Skills', description: 'Applying mathematical reasoning and analytical thinking to enhance technical problem-solving.' },
];

export default function Expertise() {
  return (
    <section className={`${s.section}`}>
      <div className={s.header}>
        <p className={s.label}>My Skills</p>
        <h2>My Expertise</h2>
      </div>
      <div className={s.grid}>
        {SKILLS.map((skill, idx) => (
          <AnimationContainer delay={idx*150} key={skill.title}>
            <div className={s.card} >
              <div className={s.iconWrap}>
                <i className={skill.icon} />
              </div>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </div>
          </AnimationContainer>
        ))}
      </div>
    </section>
  );
}
