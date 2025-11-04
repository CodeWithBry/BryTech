import { useContext, useState } from 'react'
import s from './ExpertiseSection.module.css'
import {context} from "../../App"


function ExpertiseSection({ref}) {
    const {lightMode} = useContext(context)
    const [cards] = useState([
        {
            icon: "	fas fa-code",
            title: "Front-End",
            description: "Building responsive, accessible, and visually engaging user interfaces with modern web technologies."
        },
        {
            icon: "fas fa-server",
            title: "Back-End",
            description: "Developing efficient and scalable server-side applications with clean logic and API integration."
        },
        {
            icon: "fas fa-pencil-ruler",
            title: "UI/UX",
            description: "Designing user-centered interfaces that balance usability, aesthetics, and functionality."
        },
        {
            icon: "fas fa-database",
            title: "Database Management",
            description: "Managing and optimizing databases to ensure data accuracy, speed, and security."
        },
        {
            icon: "fas fa-lightbulb",
            title: "Problem Solving",
            description: "Analyzing complex challenges and creating effective, logical solutions through critical thinking."
        },
        {
            icon: "fas fa-square-root-alt",
            title: "Math Skills",
            description: "Applying mathematical reasoning and analytical thinking to enhance technical problem-solving."
        }
    ]);

    return (
        <div className={lightMode ? s.expertise : `${s.expertise} ${s.darkExpertise}`} ref={ref}>
            <div className={s.top}>
                <i className='fas fa-diagnoses'></i>
                <div className={s.title}>
                    <p>My Skills</p>
                    <h1>My Expertise</h1>
                </div>
            </div>
            <div className={s.bottom}>
                {
                    cards.map((card) => {
                        return <div className={s.card}>
                            <div className={s.title}>
                                <i className={card.icon}></i>
                                <h2>{card.title}</h2>
                            </div>
                            <div className={s.content}>
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

export default ExpertiseSection