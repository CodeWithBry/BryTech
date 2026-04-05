import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { saveCart } from '../../utils/cart';
import CartSummary from './components/CartSummary/CartSummary';
import CartTabs from './components/CartTabs/CartTabs';
import CartTable from './components/CartTable/CartTable';
import s from './Cart.module.css';

export default function Cart() {
  const navigate = useNavigate();
  const { defineTab, cartItems, setCartItems, setShowCheckout, showToast, showModal } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('Cart');

  useEffect(() => { defineTab('/Cart'); }, []);

  function toggleSelectAll(checked) {
    setCartItems(prev => {
      const updated = prev.map(item =>
        item.status === activeTab ? { ...item, isSelected: checked } : item
      );
      saveCart(updated);
      return updated;
    });
  }

  function deleteSelected() {
    const hasSelected = cartItems.some(i => i.isSelected && i.status === activeTab);
    if (!hasSelected) {
      showToast({ type: 'error', message: 'No items selected.' });
      return;
    }

    showModal({
      title: 'Remove Items',
      message: 'Remove all selected items from your cart?',
      icon: 'fa fa-trash',
      confirmLabel: 'Remove',
      cancelLabel: 'Cancel',
      variant: 'danger',
      onConfirm: () => {
        setCartItems(prev => {
          const updated = prev.filter(i => !i.isSelected);
          saveCart(updated);
          return updated;
        });
      },
    });
  }

  function handleCheckout() {
    const hasSelected = cartItems.some(i => i.isSelected && i.status === 'Cart');
    if (!hasSelected) {
      showToast({ type: 'error', message: 'Please select items to checkout.' });
      return;
    }
    setShowCheckout(true);
  }

  const visibleItems = cartItems.filter(i => i.status === activeTab);

  return (
    <main className={s.cart}>
      <div className={s.inner}>
        <h1 className={s.pageTitle}>My Cart</h1>
        <CartTabs activeTab={activeTab} setActiveTab={setActiveTab} cartItems={cartItems} />

        <div className={s.layout}>
          <div className={s.tableWrapper}>
            <div className={s.tableControls}>
              <label className={s.selectAll}>
                <input
                  type="checkbox"
                  onChange={e => toggleSelectAll(e.target.checked)}
                  checked={visibleItems.length > 0 && visibleItems.every(i => i.isSelected)}
                />
                <span>Select All</span>
              </label>
              <button className={s.deleteBtn} onClick={deleteSelected}>
                <i className="fa fa-trash" /> Remove Selected
              </button>
            </div>

            <CartTable
              cartItems={cartItems}
              setCartItems={setCartItems}
              activeTab={activeTab}
              navigate={navigate}
            />
          </div>

          <CartSummary
            cartItems={cartItems}
            activeTab={activeTab}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </main>
  );
}
