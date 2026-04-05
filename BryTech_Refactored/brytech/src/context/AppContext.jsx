import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export const AppContext = createContext();
export const useApp = () => useContext(AppContext);

const TABS = [
  { name: "Home", path: "/", icon: "fa fa-home" },
  { name: "Shop", path: "/Shop", icon: "fa fa-shopping-bag" },
  { name: "Cart", path: "/Cart", icon: "fa fa-shopping-cart" },
  { name: "BotBry", path: "/BotBry", icon: "fas fa-robot" },
  { name: "About", path: "/About", icon: "fa fa-info" },
  { name: "Docs", path: "/Docs", icon: "fa fa-code" },
];

export function AppProvider({ children }) {
  const location = useLocation();
  const wrapperRef = useRef(null);

  const [lightMode, setLightMode] = useState(true);
  const [showPurchase, setShowPurchase] = useState(false);
  const [errorNotif, setErrorNotif] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [tabs, setTabs] = useState(TABS.map((t, i) => ({ ...t, isSelected: i === 0 })));
  const [activePath, setActivePath] = useState("/");

  function defineTab(path) {
    setActivePath(path);
    setTabs(prev => prev.map(tab => ({ ...tab, isSelected: tab.path === path })));
  }

  function scrollUp() {
    wrapperRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addToCart(newItem) {
    setCartItems(prev => {
      const exists = prev.find(item => item.name === newItem.name);
      const twoDaysFromNow = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
      const dateDeliver = twoDaysFromNow.toLocaleString("default", { month: "long", day: "numeric" });

      let updated;
      if (exists) {
        updated = prev.map(item =>
          item.name === newItem.name ? { ...item, count: (item.count ?? 1) + 1 } : item
        );
      } else {
        updated = [{ ...newItem, count: 1, isSelected: false, status: "Cart", dateDeliver }, ...prev];
      }

      localStorage.setItem("cartItems", JSON.stringify(updated));
      return updated;
    });
  }

  useEffect(() => {
    const url = window.location.href;
    const path = url.slice(url.lastIndexOf("/#/") + 2);
    setActivePath(path);
  }, [location]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cartItems"));
    if (stored) setCartItems(stored);
  }, []);

  return (
    <AppContext.Provider value={{
      lightMode, setLightMode,
      showPurchase, setShowPurchase,
      errorNotif, setErrorNotif,
      selectedProduct, setSelectedProduct,
      cartItems, setCartItems,
      tabs, setTabs,
      activePath,
      wrapperRef,
      defineTab, scrollUp, addToCart,
    }}>
      {children}
    </AppContext.Provider>
  );
}
