import s from "./CartHeader.module.css";

export default function CartHeader({ onSelectAll, totalCost, shippingCost, selectedCount, tab, onCheckout }) {
  return (
    <div className={s.header}>
      <label className={s.selectAll}>
        <input type="checkbox" onChange={e => onSelectAll(e.target.checked)} />
        <span>Select All</span>
      </label>
      <div className={s.summary}>
        <div className={s.costs}>
          <span className={s.total}>Total: <strong>₱ {totalCost}</strong></span>
          <span className={s.shipping}>Shipping: ₱ {shippingCost}</span>
        </div>
        {tab === "Cart" && (
          <button className={s.checkoutBtn} onClick={onCheckout}>
            Check Out ({selectedCount})
          </button>
        )}
      </div>
    </div>
  );
}
