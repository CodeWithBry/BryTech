import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import s from './Nav.module.css';

export default function Nav() {
  const { tabs, activePath, scrollTop, theme, toggleTheme } = useContext(AppContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNav(path) {
    navigate(path);
    scrollTop();
    setMenuOpen(false);
  }

  return (
    <nav className={s.nav}>
      <button className={s.brand} onClick={() => handleNav('/')}>
        <img src="./icon/icon.png" alt="BryTech" className={s.logo} />
        <span className={s.brandName}><em>Bry</em>Tech</span>
      </button>

      <ul className={`${s.tabs} ${menuOpen ? s.open : ''}`}>
        {tabs.map(tab => (
          <li key={tab.path}>
            <Link
              to={tab.path}
              className={`${s.tab} ${activePath === tab.path || activePath?.startsWith(tab.path + '/') && tab.path !== '/' ? s.active : ''}`}
              onClick={() => handleNav(tab.path)}
            >
              <i className={tab.icon} />
              <span>{tab.name}</span>
            </Link>
          </li>
        ))}
        <li>
          <button className={s.themeBtn} onClick={toggleTheme} aria-label="Toggle theme">
            <i className={theme === 'light' ? 'fa fa-moon-o' : 'fa fa-sun-o'} />
          </button>
        </li>
      </ul>

      <button className={s.hamburger} onClick={() => setMenuOpen(p => !p)} aria-label="Menu">
        <i className={menuOpen ? 'fa fa-times' : 'fa fa-bars'} />
      </button>
    </nav>
  );
}
