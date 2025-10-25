import s from "./Cart.module.css"
import {context} from "../App"
import { useContext, useEffect } from "react";

function Cart() {
  const { defineTab, lightMode } = useContext(context);

  useEffect(() => {
    if (defineTab) {
      defineTab("/Cart")
    }
  }, [defineTab])
  return (
    <div>Cart</div>
  )
}

export default Cart