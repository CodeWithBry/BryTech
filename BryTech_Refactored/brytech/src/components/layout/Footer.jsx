import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import s from "./Footer.module.css";

const FOOTER_DATA = [
  {
    heading: "Developer",
    links: [
      { label: "Bryan A. Pajarillaga", href: "https://www.facebook.com/bryan.agustin.521023/", icon: "fab fa-facebook-square" },
      { label: "bryanagustinpajarillaga@gmail.com", href: "mailto:bryanagustinpajarillaga@gmail.com", icon: "fa fa-envelope" },
      { label: "09150562345", href: "tel:09150562345", icon: "fa fa-phone" },
    ],
  },
  {
    heading: "Features",
    internal: true,
    links: [
      { label: "Home", to: "/", icon: "fa fa-home" },
      { label: "Shop", to: "/Shop", icon: "fa fa-shopping-bag" },
      { label: "Cart", to: "/Cart", icon: "fa fa-shopping-cart" },
      { label: "BotBry", to: "/BotBry", icon: "fas fa-robot" },
      { label: "About", to: "/About", icon: "fa fa-info" },
      { label: "Docs", to: "/Docs", icon: "fa fa-code" },
    ],
  },
  {
    heading: "Technologies",
    links: [
      { label: "React", href: "https://react.dev" },
      { label: "Express.js", href: "https://expressjs.com" },
      { label: "Gemini API", href: "https://ai.google.dev/gemini-api/docs" },
      { label: "Google Fonts", href: "https://fonts.google.com" },
    ],
  },
];

export default function Footer({ topRef }) {
  const { scrollUp } = useApp();

  return (
    <footer className={s.footer}>
      <div className={s.top}>
        <div className={s.brand}>
          <img src="./icon/icon_and_title.jpg" alt="BryTech" />
          <p>Your one-stop shop for quality PC hardware components.</p>
          <button className={s.scrollTop} onClick={scrollUp}>
            Back to top <i className="fa fa-arrow-up" />
          </button>
        </div>

        {FOOTER_DATA.map(section => (
          <div className={s.column} key={section.heading}>
            <h4>{section.heading}</h4>
            <ul>
              {section.links.map(link => (
                <li key={link.label}>
                  {section.internal ? (
                    <Link to={link.to} className={s.link} onClick={scrollUp}>
                      {link.icon && <i className={link.icon} />}
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className={s.link} target="_blank" rel="noopener noreferrer">
                      {link.icon && <i className={link.icon} />}
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={s.bottom}>
        <p>© {new Date().getFullYear()} BryTech. All rights reserved.</p>
      </div>
    </footer>
  );
}
