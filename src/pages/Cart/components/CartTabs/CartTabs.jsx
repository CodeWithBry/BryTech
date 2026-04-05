import s from './CartTabs.module.css';

export default function CartTabs({ activeTab, setActiveTab, cartItems }) {
  const cartCount = cartItems.filter(i => i.status === 'Cart').length;
  const deliverCount = cartItems.filter(i => i.status === 'To Deliver').length;

  const tabs = [
    { id: 'Cart', label: 'Cart', count: cartCount },
    { id: 'To Deliver', label: 'To Deliver', count: deliverCount },
  ];

  return (
    <div className={s.tabs}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`${s.tab} ${activeTab === tab.id ? s.active : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
          {tab.count > 0 && <span className={s.badge}>{tab.count}</span>}
        </button>
      ))}
    </div>
  );
}
