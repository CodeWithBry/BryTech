import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';
import s from './Breadcrumb.module.css';

export default function Breadcrumb() {
  const { activePath } = useContext(AppContext);
  const parts = activePath?.split('/').filter(Boolean) || [];

  if (parts.length <= 1) return null;

  return (
    <nav className={s.breadcrumb} aria-label="Breadcrumb">
      <Link to="/" className={s.crumb}>Home</Link>
      {parts.map((part, i) => {
        const isLast = i === parts.length - 1;
        const to = '/' + parts.slice(0, i + 1).join('/');
        const label = decodeURIComponent(part.split('_').join(' '));

        return (
          <span key={i} className={s.segment}>
            <i className="fa fa-chevron-right" />
            {isLast ? (
              <span className={s.current}>{label}</span>
            ) : (
              <Link to={to} className={s.crumb}>{label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
