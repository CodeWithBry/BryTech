import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import s from "./HeroSection.module.css";
import hs from "./Home.module.css";

const CARDS = [
  { src: "./Home/Keyboard.png", alt: "Keyboard", to: "/Shop/Keyboards" },
  { src: "./Home/PC.png", alt: "System Unit", to: "/Shop" },
  { src: "./Home/Mouse.png", alt: "Mouse", to: "/Shop" },
];

export default function HeroSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(`.${s.card}`);
    const dots = document.querySelectorAll(`.${s.dot}`);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const idx = Array.from(cards).indexOf(entry.target);
          if (idx === -1) return;
          cards[idx].classList.toggle(s.active, entry.isIntersecting);
          dots[idx]?.classList.toggle(s.activeDot, entry.isIntersecting);
        });
      },
      { root: container, threshold: 0.6 }
    );

    cards.forEach(card => observer.observe(card));
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        cards[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      });
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`${s.hero} ${hs.section} ${hs.fadeOut}`}>
      <div className={s.content}>
        <h1>Build Smarter, <span>Upgrade Faster</span></h1>
        <p>
          Your one-stop shop for the latest PC hardware. Whether upgrading your setup or building
          from scratch, discover quality components and unbeatable performance.
        </p>
        <div className={s.actions}>
          <Link className={`${s.btn} ${s.secondary}`} to="/About">
            Developer <i className="fa fa-info" />
          </Link>
          <Link className={`${s.btn} ${s.primary}`} to="/Shop">
            Shop Now <i className="fa fa-shopping-cart" />
          </Link>
        </div>
      </div>

      <div className={s.carousel} ref={containerRef}>
        {CARDS.map(card => (
          <div className={s.card} key={card.alt}>
            <img src={card.src} alt={card.alt} />
            <Link to={card.to}>Shop Now</Link>
          </div>
        ))}
      </div>

      <div className={s.dots}>
        {CARDS.map((_, i) => <div className={s.dot} key={i} />)}
      </div>
    </section>
  );
}
