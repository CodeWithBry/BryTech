import { useShop } from "./Shop";
import s from "./Banner.module.css";

export default function Banner() {
  const { selectedCategory } = useShop();
  return (
    <div
      className={s.banner}
      style={{ backgroundImage: selectedCategory?.banner ? `url(${selectedCategory.banner})` : undefined }}
    >
      <div className={s.overlay}>
        <h1><span>Build Smarter</span> Upgrade Faster</h1>
      </div>
    </div>
  );
}
