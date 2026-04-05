import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Shop';
import s from './CategoryNav.module.css';

export default function CategoryNav() {
  const { categories, selectCategory } = useContext(ShopContext);

  return (
    <nav className={s.nav}>
      {categories.map(cat => (
        <Link
          key={cat.name}
          to={`/Shop/${cat.name}`}
          className={`${s.link} ${cat.isSelected ? s.active : ''}`}
          onClick={() => selectCategory(cat)}
        >
          {cat.name}
        </Link>
      ))}
    </nav>
  );
}
