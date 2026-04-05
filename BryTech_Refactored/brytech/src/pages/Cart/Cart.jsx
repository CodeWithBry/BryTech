import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import CartHeader from "./CartHeader";
import CartTabs from "./CartTabs";
import CartTable from "./CartTable";
import s from "./Cart.module.css";

export default function Cart() {
  const { defineTab, cartItems, setCartItems, setShowPurchase, setErrorNotif } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState("Cart");

  useEffect(() => { defineTab("/Cart"); }, []);

  function selectAll(checked) {
    setCartItems(prev =>
      prev.map(item => item.status === tab ? { ...item, isSelected: checked } : item)
    );
  }

  function deleteSelected() {
    setCartItems(prev => {
      const updated = prev.filter(item => !item.isSelected);
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return updated;
    });
  }

  function checkout() {
    const selected = cartItems.filter(i => i.isSelected && i.status === "Cart");
    if (selected.length === 0) { setErrorNotif("No items selected!"); return; }
    setShowPurchase(true);
  }

  const tabItems = cartItems.filter(i => i.status === tab);
  const selectedCount = tabItems.filter(i => i.isSelected).reduce((acc, i) => acc + (i.count ?? 1), 0);
  const totalCost = tabItems.filter(i => i.isSelected)
    .reduce((acc, i) => acc + (Number(String(i.price_php).replace(/,/g, "")) + Number(i.shipping_fee_php ?? 0)) * (i.count ?? 1), 0);
  const shippingCost = tabItems.filter(i => i.isSelected)
    .reduce((acc, i) => acc + Number(i.shipping_fee_php ?? 0) * (i.count ?? 1), 0);

  return (
    <div className={s.cart}>
      <CartHeader
        onSelectAll={selectAll}
        totalCost={totalCost.toLocaleString()}
        shippingCost={shippingCost.toLocaleString()}
        selectedCount={selectedCount}
        tab={tab}
        onCheckout={checkout}
      />
      <CartTabs tab={tab} setTab={setTab} />
      <CartTable
        items={cartItems}
        tab={tab}
        setCartItems={setCartItems}
        navigate={navigate}
      />
      <button className={s.deleteBtn} onClick={deleteSelected} title="Delete selected">
        <i className="far fa-trash-alt" />
      </button>
    </div>
  );
}
