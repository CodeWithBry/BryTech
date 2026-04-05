import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';
import { ShopContext } from '../Shop';
import s from './ProductCard.module.css';

export default function ProductCard({ item, category }) {
  const { addToCart, scrollTop } = useContext(AppContext);
  const { setSelectedItem } = useContext(ShopContext);
  const navigate = useNavigate();

  const slug = item.name.split(' ').join('_').toLowerCase();
  const imgSrc = `./products/${category != "All" ? category : item.category+"s"}/${item.image}`;

  function openDetails() {
    navigate(`/Shop/Products/${slug}`);
    scrollTop();
    setSelectedItem(item);
  }

  return (
    <article className={s.card}>
      <div className={s.imageWrapper} onClick={openDetails}>
        <img src={imgSrc} alt={item.name}/>
      </div>
      <div className={s.body}>
        <h2 className={s.name} onClick={openDetails}>{item.name}</h2>
        <p className={s.brand}>{item.brand}</p>
        {item.gen && <p className={s.meta}>{item.gen}</p>}
      </div>
      <div className={s.footer}>
        <span className={s.price}>₱ {item.price_php}</span>
        <div className={s.actions}>
          <button className={s.detailsBtn} onClick={openDetails}>
            Details
          </button>
          <button
            className={s.cartBtn}
            onClick={() => addToCart(item)}
            aria-label="Add to cart"
          >
            <i className="fa fa-shopping-cart" />
          </button>
        </div>
      </div>
    </article>
  );
}
