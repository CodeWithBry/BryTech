import s from "./DocsSidebar.module.css";

export default function DocsSidebar({ links, open, setOpen, onToggle, onScrollTo }) {
  return (
    <aside className={`${s.sidebar} ${open ? s.open : s.collapsed}`}>
      <div className={s.inner}>
        {links.map(link => (
          <div className={s.group} key={link.slug}>
            <button
              className={`${s.groupBtn} ${link.open ? s.activeGroup : ""}`}
              onClick={() => onToggle(link.slug)}
            >
              <span>{link.label}</span>
              <i className={`fas ${link.open ? "fa-angle-up" : "fa-angle-down"}`} />
            </button>
            {link.open && (
              <div className={s.subLinks}>
                {link.sections.map(sec => (
                  <button
                    key={sec.id}
                    className={s.subLink}
                    onClick={() => onScrollTo(sec.id)}
                  >
                    <i className="fas fa-angle-right" />
                    <span>{sec.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        className={s.toggleBtn}
        onClick={() => setOpen(p => !p)}
        title={open ? "Collapse sidebar" : "Expand sidebar"}
      >
        <i className={`fas ${open ? "fa-angle-left" : "fa-angle-right"}`} />
      </button>
    </aside>
  );
}
