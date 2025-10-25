import s from "./BotBry.module.css"
import {context} from "../App"
import { useContext, useEffect } from "react";

function BotBry() {
  const { defineTab, lightMode } = useContext(context);

  useEffect(() => {
    if (defineTab) {
      defineTab("/BotBry")
    }
  }, [defineTab])
  return (
    <div>BotBry</div>
  )
}

export default BotBry