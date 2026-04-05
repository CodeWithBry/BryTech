import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import s from "./FeaturedProducts.module.css";
import hs from "./Home.module.css";

const CATEGORIES = [
  { label: "CPU", path: "cpu", dir: "CPUs" },
  { label: "RAM", path: "ram", dir: "RAMs" },
  { label: "Keyboard", path: "key", dir: "Keyboards" },
];

export default function FeaturedProducts() {
  const { scrollUp } = useApp();
  const containerRef = useRef(null);
  const [products, setProducts] = useState(null);
  const [active, setActive] = useState(CATEGORIES[0]);
  const [dropOpen, setDropOpen] = useState(false);

  async function fetchCategory(cat) {
    try {
      const res = await fetch(`/BryTech/products/${cat.dir}/${cat.path}.json`);
      const data = await res.json();
      setProducts(data);
    } catch {}
  }

  useEffect(() => {
    fetchCategory(active);
  }, [active]);

  useEffect(() => {
    if (!products) return;
    const timer = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;
      const cards = container.querySelectorAll(`.${s.item}`);
      const dots = document.querySelectorAll(`.${s.dot}`);

      const obs = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            const idx = Array.from(cards).indexOf(e.target);
            if (idx === -1) return;
            if (e.isIntersecting) {
              cards.forEach(c => c.classList.remove(s.active));
              dots.forEach(d => d.classList.remove(s.activeDot));
              e.target.classList.add(s.active);
              dots[idx]?.classList.add(s.activeDot);
            }
          });
        },
        { root: container, threshold: 0.7 }
      );

      cards.forEach(c => obs.observe(c));
      dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
          cards[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        });
      });
      return () => obs.disconnect();
    }, 500);
    return () => clearTimeout(timer);
  }, [products]);

  const items = products?.[0]?.items?.slice(0, 5) ?? [];

  return (
    <section className={`${s.featured} ${hs.section} ${hs.fadeOut}`}>
      <div className={s.heading}>
        <button className={s.headingBtn} onClick={() => setDropOpen(p => !p)}>
          Top Selling{" "}
          <span className={s.catLabel}>
            {active.label}
            <i className={dropOpen ? "fa fa-angle-up" : "fa fa-angle-down"} />
          </span>
        </button>
        {dropOpen && (
          <div className={s.dropdown}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.label}
                className={cat.label === active.label ? s.dropActive : ""}
                onClick={() => { setActive(cat); setDropOpen(false); }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={s.carousel} ref={containerRef}>
        {items.map((product, i) => (
          <div className={s.item} key={i}>
            <div className={s.imgWrap}>
              <img
                src={`./products/${active.label}s/${product.image}`}
                alt={product.name}
              />
            </div>
            <div className={s.info}>
              <h2>{product.name}</h2>
              <Link
                to={`/Shop/Products/${product.name.toLowerCase().split(" ").join("_")}`}
                onClick={scrollUp}
                className={s.shopLink}
              >
                Shop Now <i className="fa fa-shopping-bag" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className={s.dots}>
        {items.map((_, i) => <div className={s.dot} key={i} />)}
      </div>
    </section>
  );
}
