import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { useShop } from "./Shop";
import s from "./ProductDetails.module.css";

export default function ProductDetails() {
  const { addToCart, setShowPurchase, setSelectedProduct } = useApp();
  const { selectedItem } = useShop();
  const [expanded, setExpanded] = useState(false);

  if (!selectedItem) return null;

  const imgSrc = `./products/${selectedItem.category}s/${selectedItem.image}`;

  return (
    <div className={s.wrapper}>
      <div className={s.detail}>
        <div
          className={s.imgPanel}
          style={{ backgroundImage: `url('${imgSrc}')` }}
        />
        <div className={s.content}>
          <h1>{selectedItem.name}</h1>

          <div className={s.description}>
            <p className={expanded ? s.full : s.clamped}>{selectedItem.paragraph}</p>
            <button className={s.toggle} onClick={() => setExpanded(p => !p)}>
              {expanded ? "Show Less" : "Show More"}
            </button>
          </div>

          <div className={s.specs}>
            <div className={s.specCol}>
              <p><strong>Specs:</strong> {selectedItem.specs}</p>
              <p><strong>Brand:</strong> {selectedItem.brand}</p>
            </div>
            <div className={s.specCol}>
              <p><strong>{selectedItem.gen ? "Gen" : "Type"}:</strong> {selectedItem.gen ?? selectedItem.type}</p>
              <p><strong>Category:</strong> {selectedItem.category}</p>
            </div>
          </div>

          <div className={s.actions}>
            <span className={s.price}>₱ {selectedItem.price_php}</span>
            <div className={s.buttons}>
              <button
                className={s.cartBtn}
                onClick={() => addToCart(selectedItem)}
              >
                Add to Cart <i className="fa fa-shopping-cart" />
              </button>
              <button
                className={s.buyBtn}
                onClick={() => { setShowPurchase(true); setSelectedProduct(selectedItem); }}
              >
                Buy Now <i className="far fa-credit-card" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
