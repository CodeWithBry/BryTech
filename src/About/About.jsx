import s from "./About.module.css"
import {context} from "../App"
import { useContext, useEffect } from "react";

function About() {
  const { defineTab, lightMode } = useContext(context);

  useEffect(() => {
    if (defineTab) {
      defineTab("/About")
    }
  }, [defineTab])
  return (
    <div>About</div>
  )
}

export default About