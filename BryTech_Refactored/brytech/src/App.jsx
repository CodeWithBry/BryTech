import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import CartNotification from "./components/ui/CartNotification";
import CheckOut from "./components/ui/CheckOut";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Cart from "./pages/Cart/Cart";
import BotBry from "./pages/BotBry/BotBry";
import About from "./pages/About/About";
import Docs from "./pages/Docs/Docs";

function AppRoutes() {
  const { wrapperRef, lightMode } = useApp();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", lightMode ? "light" : "dark");
  }, [lightMode]);

  return (
    <div className="wrapper" ref={wrapperRef}>
      <Nav />
      <CartNotification />
      <CheckOut />
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
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
