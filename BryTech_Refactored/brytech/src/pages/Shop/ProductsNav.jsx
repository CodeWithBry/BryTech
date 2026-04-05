import { Link } from "react-router-dom";
import { useShop } from "./Shop";
import s from "./ProductsNav.module.css";

export default function ProductsNav() {
  const { categories, setSelectedCategory, loadCategory } = useShop();
  return (
    <nav className={s.nav}>
      {categories.map(cat => (
        <Link
          key={cat.name}
          to={`/Shop/${cat.name}`}
          className={`${s.link} ${cat.isSelected ? s.active : ""}`}
          onClick={() => { setSelectedCategory(cat); loadCategory(cat); }}
        >
          {cat.name}
        </Link>
      ))}
    </nav>
  );
}
