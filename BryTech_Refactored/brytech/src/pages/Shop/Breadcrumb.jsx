import { Link, useLocation } from "react-router-dom";
import s from "./Breadcrumb.module.css";

export default function Breadcrumb() {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length < 2) return null;

  function buildPath(index) {
    const slice = parts.slice(0, index + 1);
    if (slice.some(p => p === "Search" || p === "Products")) return "/Shop";
    return "/" + slice.join("/");
  }

  return (
    <nav className={s.breadcrumb}>
      <Link to="/" className={s.crumb}>Home</Link>
      {parts.map((part, i) => (
        <span key={i} className={s.segment}>
          <span className={s.sep}>/</span>
          {i === parts.length - 1 ? (
            <span className={s.current}>{decodeURIComponent(part)}</span>
          ) : (
            <Link to={buildPath(i)} className={s.crumb}>
              {decodeURIComponent(part)}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
