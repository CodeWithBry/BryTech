import s from './CartSummary.module.css';

export default function CartSummary({ cartItems, activeTab, onCheckout }) {
  const selected = cartItems.filter(i => i.isSelected || i.status === activeTab);

  let subtotal = 0;
  let shipping = 0;
  let totalQty = 0;

  selected.forEach(item => {
    const fee = Number(item.shipping_fee_php || 0);
    const qty = item.count || 1;
    subtotal += ((Number(item.price_php.split(", ").join("")) + Number(item.shipping_fee_php)) * item.count);
    shipping += fee * qty;
    console.log(qty)
    totalQty += qty;
  });

  const total = subtotal + shipping;

  return (
    <div className={s.summary}>
      <h2 className={s.heading}>Order Summary</h2>

      <div className={s.rows}>
        <div className={s.row}>
          <span>Items ({totalQty})</span>
          <span>₱ {subtotal.toLocaleString()}</span>
        </div>
        <div className={s.row}>
          <span>Shipping</span>
          <span>₱ {shipping.toLocaleString()}</span>
        </div>
      </div>

      <div className={s.divider} />

      <div className={`${s.row} ${s.total}`}>
        <span>Total</span>
        <span>₱ {total.toLocaleString()}</span>
      </div>

      {activeTab === 'Cart' && (
        <button className={s.checkoutBtn} onClick={onCheckout} disabled={totalQty === 0}>
          Checkout ({totalQty} {totalQty === 1 ? 'item' : 'items'})
        </button>
      )}

      {totalQty === 0 && (
        <p className={s.hint}>Select items to checkout.</p>
      )}
    </div>
  );
}
