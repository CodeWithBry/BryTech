import { useState, useRef, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import { loadCart, addItemToCart } from './utils/cart';

import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Toast from './components/Notification/Toast';
import Modal from './components/Modal/Modal';
import Checkout from './components/Checkout/Checkout';

import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Cart from './pages/Cart/Cart';
import BotBry from './pages/BotBry/BotBry';
import About from './pages/About/About';
import Docs from './pages/Docs/Docs';

import s from './App.module.css';

const NAV_TABS = [
  { name: 'Home', path: '/', icon: 'fa fa-home' },
  { name: 'Shop', path: '/Shop', icon: 'fa fa-shopping-bag' },
  { name: 'Cart', path: '/Cart', icon: 'fa fa-shopping-cart' },
  { name: 'BotBry', path: '/BotBry', icon: 'fas fa-robot' },
  { name: 'About', path: '/About', icon: 'fa fa-info' },
  { name: 'Docs', path: '/Docs', icon: 'fa fa-code' },
];

export default function App() {
  const location = useLocation();
  const wrapperRef = useRef(null);

  const [theme, setTheme] = useState('light');
  const [activePath, setActivePath] = useState('/');
  const [cartItems, setCartItems] = useState(loadCart);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(null);

  function toggleTheme() {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }

  function scrollTop() {
    wrapperRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function defineTab(path) {
    setActivePath(path);
  }

  function addToCart(item) {
    setCartItems(prev => addItemToCart(prev, item));
    showToast({ type: 'success', message: `${item.name} added to cart` });
  }

  function showToast(config) {
    setToast(config);
  }

  function showModal(config) {
    setModal(config);
  }

  function closeModal() {
    setModal(null);
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const url = window.location.href;
    const path = url.slice(url.lastIndexOf('/#/') + 2);
    setActivePath(path || '/');
  }, [location]);

  const ctx = {
    theme,
    toggleTheme,
    activePath,
    defineTab,
    wrapperRef,
    scrollTop,
    cartItems,
    setCartItems,
    addToCart,
    selectedProduct,
    setSelectedProduct,
    showCheckout,
    setShowCheckout,
    showToast,
    showModal,
    closeModal,
    tabs: NAV_TABS,
  };

  const isBotBry = activePath === '/BotBry' || activePath?.startsWith('/BotBry/');

  return (
    <AppContext.Provider value={ctx}>
      <div className={s.wrapper} ref={wrapperRef}>
        <Nav />
        {toast && <Toast config={toast} onClose={() => setToast(null)} />}
        {modal && <Modal config={modal} onClose={closeModal} />}
        {showCheckout && <Checkout />}
        <Routes>
          <Route path="/" element={<><Home /><Footer /></>} />
          <Route path="/Shop" element={<><Shop /><Footer /></>} />
          <Route path="/Shop/:productCategory" element={<><Shop /><Footer /></>} />
          <Route path="/Shop/Products/:productName" element={<><Shop /><Footer /></>} />
          <Route path="/Shop/Search/:searchDescription" element={<><Shop /><Footer /></>} />
          <Route path="/Cart" element={<><Cart /><Footer /></>} />
          <Route path="/BotBry" element={<BotBry />} />
          <Route path="/BotBry/:convoId" element={<BotBry />} />
          <Route path="/About" element={<><About /><Footer /></>} />
          <Route path="/Docs" element={<Docs />} />
          <Route path="/Docs/:subLink" element={<Docs />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}
