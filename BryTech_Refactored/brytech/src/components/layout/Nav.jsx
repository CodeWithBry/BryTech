import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import s from "./Nav.module.css";

export default function Nav() {
  const { tabs, scrollUp, lightMode, setLightMode } = useApp();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleTabClick(path) {
    navigate(path);
    scrollUp();
    setMobileOpen(false);
  }

  return (
    <nav className={s.nav}>
      <div className={s.brand} onClick={() => handleTabClick("/")}>
        <img src="./icon/icon.png" alt="BryTech" className={s.logo} />
        <span className={s.brandName}>
          <em>Bry</em>Tech
        </span>
      </div>

      <ul className={`${s.tabs} ${mobileOpen ? s.open : ""}`}>
        {tabs.map(tab => (
          <li
            key={tab.path}
            className={`${s.tab} ${tab.isSelected ? s.active : ""}`}
            onClick={() => handleTabClick(tab.path)}
          >
            <i className={tab.icon} />
            <Link to={tab.path}>{tab.name}</Link>
          </li>
        ))}
        <li
          className={s.themeToggle}
          onClick={() => setLightMode(prev => !prev)}
          title={lightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          <img
            src={lightMode ? "./icon/light.png" : "./icon/dark.png"}
            alt="theme"
          />
        </li>
      </ul>

      <button
        className={s.hamburger}
        onClick={() => setMobileOpen(prev => !prev)}
        aria-label="Toggle menu"
      >
        <i className={mobileOpen ? "fa fa-times" : "fa fa-bars"} />
      </button>
    </nav>
  );
}
