import s from './HeroSection.module.css'

function HeroSection() {

    return <div className={s.heroSection}>
        <div className={s.left}>
            <div className={s.contents}>
                <p className={s.small}>Hey, I am Bryan</p>
                <h1>I Design <strong>UI/UX</strong> and <strong>Develop Website</strong></h1>
            <p className={s.paragraph}>Hi, I am Bryan A. Pajarillaga, I make functional websites and stunning graphical UI contents.</p>
                <a href='https://github.com/CodeWithBry' target='_blank'>My Github <i className='fab fa-github'></i></a>
            </div>
        </div>
        <div className={s.right}>
            <img src="./About/hero.png" />
        </div>
 
       {/* <img src="./About/wave.png" className={s.background}/> */}
    </div>
}

export default HeroSection