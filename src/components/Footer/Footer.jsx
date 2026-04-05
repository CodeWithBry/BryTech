import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import s from './Footer.module.css';

const SECTIONS = [
  {
    heading: 'Developer',
    links: [
      { label: 'Bryan A. Pajarillaga', href: 'https://www.facebook.com/bryan.agustin.521023/', icon: 'fab fa-facebook-square', external: true },
      { label: 'bryanagustinpajarillaga@gmail.com', href: 'mailto:bryanagustinpajarillaga@gmail.com', icon: 'fa fa-envelope', external: true },
      { label: '09150562345', href: 'tel:09150562345', icon: 'fa fa-phone', external: true },
    ],
  },
  {
    heading: 'Navigation',
    links: [
      { label: 'Home', to: '/', icon: 'fa fa-home' },
      { label: 'Shop', to: '/Shop', icon: 'fa fa-shopping-bag' },
      { label: 'Cart', to: '/Cart', icon: 'fa fa-shopping-cart' },
      { label: 'BotBry', to: '/BotBry', icon: 'fas fa-robot' },
      { label: 'About', to: '/About', icon: 'fa fa-info' },
      { label: 'Docs', to: '/Docs', icon: 'fa fa-code' },
    ],
  },
  {
    heading: 'Technologies',
    links: [
      { label: 'React', href: 'https://react.dev', external: true },
      { label: 'Vite', href: 'https://vitejs.dev', external: true },
      { label: 'Express', href: 'https://expressjs.com', external: true },
      { label: 'Gemini API', href: 'https://ai.google.dev/gemini-api/docs', external: true },
    ],
  },
];

export default function Footer() {
  const { scrollTop } = useContext(AppContext);

  return (
    <footer className={s.footer}>
      <div className={s.top}>
        <div className={s.brand}>
          <img src="./icon/icon.png" alt="BryTech" className={s.logo} />
          <span className={s.name}><em>Bry</em>Tech</span>
          <p className={s.tagline}>Your one-stop PC hardware shop.</p>
        </div>

        {SECTIONS.map(section => (
          <div className={s.section} key={section.heading}>
            <h4 className={s.heading}>{section.heading}</h4>
            <ul className={s.list}>
              {section.links.map(link => (
                <li key={link.label}>
                  {link.external ? (
                    <a href={link.href} className={s.link} target="_blank" rel="noopener noreferrer">
                      {link.icon && <i className={link.icon} />}
                      <span>{link.label}</span>
                    </a>
                  ) : (
                    <Link to={link.to} className={s.link} onClick={scrollTop}>
                      {link.icon && <i className={link.icon} />}
                      <span>{link.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={s.bottom}>
        <p>&copy; {new Date().getFullYear()} BryTech. All rights reserved.</p>
        <button className={s.scrollTopBtn} onClick={scrollTop}>
          Back to top <i className="fa fa-arrow-up" />
        </button>
      </div>
    </footer>
  );
}
