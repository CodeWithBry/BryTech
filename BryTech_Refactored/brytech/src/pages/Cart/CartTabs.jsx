import s from "./CartTabs.module.css";

export default function CartTabs({ tab, setTab }) {
  return (
    <div className={s.tabs}>
      {["Cart", "To Deliver"].map(t => (
        <button
          key={t}
          className={`${s.tab} ${tab === t ? s.active : ""}`}
          onClick={() => setTab(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
