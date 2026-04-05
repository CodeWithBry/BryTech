import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../../context/AppContext';
import { saveCart } from '../../../../utils/cart';
import s from './CartTable.module.css';

export default function CartTable({ cartItems, setCartItems, activeTab }) {
  const navigate = useNavigate();
  const { showModal } = useContext(AppContext);

  const visible = cartItems.filter(i => i.status === activeTab);

  function updateCount(name, delta) {
    setCartItems(prev => {
      const updated = prev.map(item => {
        if (item.name !== name) return item;
        const next = item.count + delta;
        if (next < 1) return item;
        if (next > 99) return item;
        return { ...item, count: next };
      });
      saveCart(updated);
      return updated;
    });
  }

  function setCount(name, value) {
    const n = Math.min(99, Math.max(1, Number(value) || 1));
    setCartItems(prev => {
      const updated = prev.map(item => item.name === name ? { ...item, count: n } : item);
      saveCart(updated);
      return updated;
    });
  }

  function toggleSelect(name, checked) {
    setCartItems(prev => {
      const updated = prev.map(item => item.name === name ? { ...item, isSelected: checked } : item);
      saveCart(updated);
      return updated;
    });
  }

  function cancelOrder(name) {
    setCartItems(prev => {
      const updated = prev.map(item =>
        item.name === name ? { ...item, status: 'Cart', isSelected: false } : item
      );
      saveCart(updated);
      return updated;
    });
  }

  if (visible.length === 0) {
    return (
      <div className={s.empty}>
        <i className="fa fa-shopping-cart" />
        <p>No items here.</p>
        <button className={s.shopBtn} onClick={() => navigate('/Shop')}>
          Browse Shop
        </button>
      </div>
    );
  }

  return (
    <div className={s.list}>
      {visible.map(item => (
        <div key={item.name} className={`${s.row} ${item.isSelected ? s.selected : ''}`}>
          <input
            type="checkbox"
            className={s.checkbox}
            checked={!!item.isSelected}
            onChange={e => toggleSelect(item.name, e.target.checked)}
          />

          <div
            className={s.image}
            style={{ backgroundImage: `url(./products/${item.category}s/${item.image})` }}
            onClick={() => navigate(`/Shop/Products/${item.name.split(' ').join('_').toLowerCase()}`)}
          />

          <div className={s.info}>
            <h3
              className={s.name}
              onClick={() => navigate(`/Shop/Products/${item.name.split(' ').join('_').toLowerCase()}`)}
            >
              {item.name}
            </h3>
            <span className={s.brand}>{item.brand}</span>
            {activeTab === 'To Deliver' && (
              <div className={s.delivery}>
                <i className="fas fa-truck" />
                <span>Est. delivery: {item.dateDeliver}</span>
              </div>
            )}
          </div>

          <div className={s.right}>
            <span className={s.price}>₱ {item.price_php}</span>

            {activeTab === 'Cart' && (
              <div className={s.qty}>
                <button onClick={() => updateCount(item.name, -1)} disabled={item.count <= 1}>
                  <i className="fas fa-minus" />
                </button>
                <input
                  type="number"
                  value={item.count}
                  min={1}
                  max={99}
                  onChange={e => setCount(item.name, e.target.value)}
                />
                <button onClick={() => updateCount(item.name, 1)} disabled={item.count >= 99}>
                  <i className="fas fa-plus" />
                </button>
              </div>
            )}

            {activeTab === 'To Deliver' && (
              <button
                className={s.cancelBtn}
                onClick={() =>
                  showModal({
                    title: 'Cancel Order',
                    message: `Cancel order for "${item.name}"?`,
                    icon: 'fa fa-times-circle',
                    confirmLabel: 'Cancel Order',
                    cancelLabel: 'Keep',
                    variant: 'danger',
                    onConfirm: () => cancelOrder(item.name),
                  })
                }
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
