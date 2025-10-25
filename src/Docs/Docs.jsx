import s from "./Docs.module.css"
import {context} from "../App"
import { useContext, useEffect } from "react";

function Docs() {
  const { defineTab, lightMode } = useContext(context);

  useEffect(() => {
    if (defineTab) {
      defineTab("/Docs")
    }
  }, [defineTab])
  return (
    <div>Docs</div>
  )
}

export default Docs