import { useContext, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import { ShopContext } from '../Shop';
import s from './ProductDetails.module.css';

export default function ProductDetails() {
  const { addToCart, setShowCheckout, setSelectedProduct } = useContext(AppContext);
  const { selectedItem } = useContext(ShopContext);
  const [expanded, setExpanded] = useState(false);

  if (!selectedItem) return null;

  const imgSrc = `./products/${selectedItem.category}s/${selectedItem.image}`;

  return (
    <div className={s.wrapper}>
      <div className={s.card}>
        <div className={s.imagePanel} style={{ backgroundImage: `url('${imgSrc}')` }} />

        <div className={s.details}>
          <h1 className={s.name}>{selectedItem.name}</h1>

          <div className={s.descBlock}>
            <p className={`${s.desc} ${expanded ? s.expanded : ''}`}>
              {selectedItem.paragraph}
            </p>
            <button className={s.toggleBtn} onClick={() => setExpanded(p => !p)}>
              {expanded ? 'Show less' : 'Show more'}
            </button>
          </div>

          <div className={s.specs}>
            <div className={s.specRow}>
              <span className={s.specLabel}>Brand</span>
              <span className={s.specValue}>{selectedItem.brand}</span>
            </div>
            <div className={s.specRow}>
              <span className={s.specLabel}>Category</span>
              <span className={s.specValue}>{selectedItem.category}</span>
            </div>
            {selectedItem.gen && (
              <div className={s.specRow}>
                <span className={s.specLabel}>Gen</span>
                <span className={s.specValue}>{selectedItem.gen}</span>
              </div>
            )}
            {selectedItem.type && (
              <div className={s.specRow}>
                <span className={s.specLabel}>Type</span>
                <span className={s.specValue}>{selectedItem.type}</span>
              </div>
            )}
            {selectedItem.specs && (
              <div className={s.specRow}>
                <span className={s.specLabel}>Specs</span>
                <span className={s.specValue}>{selectedItem.specs}</span>
              </div>
            )}
          </div>

          <div className={s.footer}>
            <span className={s.price}>₱ {selectedItem.price_php}</span>
            <div className={s.actions}>
              <button className={s.cartBtn} onClick={() => addToCart(selectedItem)}>
                <i className="fa fa-shopping-cart" /> Add to Cart
              </button>
              <button
                className={s.buyBtn}
                onClick={() => { setSelectedProduct(selectedItem); setShowCheckout(true); }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
