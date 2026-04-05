import { useEffect } from "react";
import { useApp } from "../../context/AppContext";
import s from "./CartNotification.module.css";

export default function CartNotification() {
  const { errorNotif, setErrorNotif } = useApp();

  useEffect(() => {
    if (!errorNotif) return;
    const timer = setTimeout(() => setErrorNotif(null), 3000);
    return () => clearTimeout(timer);
  }, [errorNotif]);

  if (!errorNotif) return null;

  return (
    <div className={s.notification}>
      <i className="fa fa-exclamation-circle" />
      <span>{errorNotif}</span>
      <button onClick={() => setErrorNotif(null)}>
        <i className="fa fa-times" />
      </button>
    </div>
  );
}
