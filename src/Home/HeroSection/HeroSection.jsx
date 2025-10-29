import s from "./HeroSection.module.css"
import { context } from "../../App"
import { useContext, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
function HeroSection() {
    const { lightMode } = useContext(context)
    const heroRef = useRef(null)
    const containerRef = useRef()

    useEffect(() => {
        const cards = containerRef.current.querySelectorAll(`.${s.card}`);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Add active class if the card is at least 60% visible
                    if (entry.isIntersecting) {
                        entry.target.classList.add(s.active);
                    } else {
                        entry.target.classList.remove(s.active);
                    }
                });
            },
            {
                root: containerRef.current,
                threshold: .7, // 60% visibility threshold
            }
        );

        cards.forEach((card) => observer.observe(card));

        return () => observer.disconnect();

    }, [])

    return (
        <div className={lightMode ? s.hero : `${s.hero} ${s.darkHero}`} ref={heroRef}>
            <div className={s.top}>
                <h1>Build Smarter, <span>Upgrade Faster</span></h1>
                <p>
                    Welcome to BryTech, your one-stop shop for the latest PC hardware. Whether you’re upgrading your setup or building from scratch, discover quality components, trusted brands, and unbeatable performance — all in one place.
                </p>
                <div className={s.actions}>
                    <Link className={`${s.link} ${s.developer}`} to={"/About"}>Developer <i className="fa fa-info"></i></Link>
                    <Link className={`${s.link} ${s.toShop}`} to={"/Shop"}>Shop Now <i className="fa fa-shopping-cart"></i></Link>
                </div>
            </div>
            <div className={s.photos} ref={containerRef}>
                <div className={s.card}>
                    <img src="./Home/Keyboard.png" alt="Keyboard" />
                    <Link to={"/Shop/Keyboards"}>Shop Now</Link>
                </div>
                <div className={s.card}>
                    <img src="./Home/PC.png" alt="System Unit" />
                    <Link to={"/Shop"}>Shop Now</Link>
                </div>
                <div className={s.card}>
                    <img src="./Home/Mouse.png" alt="Mouse" />
                    <Link to={"/Shop"}>Shop Now</Link>
                </div>
            </div>
        </div>
    )
}

export default HeroSection