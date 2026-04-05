import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import s from "./ChatInfo.module.css";
import hs from "./Home.module.css";

export default function ChatInfo() {
  const { scrollUp } = useApp();

  return (
    <section className={`${s.chatInfo} ${hs.section} ${hs.fadeOut}`}>
      <div className={s.text}>
        <h2>Need Assistance?</h2>
        <p>
          Meet BotBry — your personal tech assistant. Ask anything about PC components,
          compatibility, or build recommendations.
        </p>
        <Link to="/BotBry" onClick={scrollUp} className={s.btn}>
          Try BotBry <i className="fa fa-commenting" />
        </Link>
      </div>
      <div className={s.visual}>
        <img src="./Home/typing.gif" alt="BotBry chat" />
      </div>
    </section>
  );
}
