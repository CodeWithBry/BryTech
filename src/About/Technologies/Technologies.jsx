import { useContext, useState } from 'react';
import s from './Technologies.module.css'
import {context} from "../../App"

function Technologies({ref}) {
    const {lightMode} = useContext(context)
    const [techStack] = useState([
        {
            src: "./About/React.svg",
            title: "React JS",
            description: "React JS is my go-to library for building fast, scalable, and interactive user interfaces. I specialize in creating reusable components and managing state effectively using hooks and context. My focus is on delivering seamless user experiences through responsive and dynamic front-end architecture."
        },
        {
            src: "./About/HTML.png",
            title: "HTML",
            description: "I use HTML to build clean, semantic, and accessible structures that serve as the foundation for every website I create. It ensures that content is well-organized and optimized for both users and search engines. I follow modern standards and best practices to keep markup efficient and easy to maintain."
        },
        {
            src: "./About/CSS.svg",
            title: "CSS",
            description: "CSS is where design meets code, and I love using it to bring interfaces to life. I specialize in crafting responsive layouts, smooth animations, and modern visual styles that enhance user experience. Whether through Flexbox, Grid, or frameworks, I ensure every element looks great on any device."
        },
        {
            src: "./About/JS.jpg",
            title: "JavaScript",
            description: "JavaScript is the backbone of interactivity on the web, and I use it to make static designs dynamic and engaging. I focus on writing clean, efficient, and modular code that enhances performance and maintainability. With experience in DOM manipulation, API integration, and asynchronous programming."
        },
        {
            src: "./About/TS.png",
            title: "TypeScript",
            description: "TypeScript adds structure and reliability to my JavaScript projects by introducing static typing and better tooling. It helps me catch errors early and maintain clean, scalable codebases for larger applications. "
        },
        {
            src: "./About/Gemini.webp",
            title: "Gemini API",
            description: "I use Google’s Gemini API to integrate AI-powered capabilities into my projects, from content generation to intelligent automation. It allows me to create adaptive and context-aware features that enhance user experience."
        }
    ]);


    return (
        <div className={lightMode ? `${s.technologies}` : `${s.technologies} ${s.darkTechnologies}`} ref={ref}>
            <div className={s.top}>
                <i className='fas fa-cogs'></i>
                <div className={s.title}>
                    <p>Tools</p>
                    <h1>My Technologies</h1>
                </div>
            </div>
            <div className={s.bottom}>
                {
                    techStack.map((card) => {
                        return <div className={s.card}>
                            <div className={s.title}>
                                <img src={card.src} alt={card.src} />
                            </div>
                            <div className={s.content}>
                                <h2>{card.title}</h2>
                                <p>{card.description}</p>
                                <a className={s.link} href='https://github.com/CodeWithBry' target='_blank'>View Github</a>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Technologies