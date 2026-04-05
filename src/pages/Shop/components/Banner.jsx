import { useContext } from 'react';
import { ShopContext } from '../Shop';
import s from './Banner.module.css';

export default function Banner() {
  const { selectedCategory } = useContext(ShopContext);

  return (
    <div
      className={s.banner}
      style={{ backgroundImage: `url(${selectedCategory?.banner})` }}
    >
      <div className={s.overlay}>
        <h1><span>Build Smarter</span> — Upgrade Faster</h1>
      </div>
    </div>
  );
}
