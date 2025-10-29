import s from "./Cart.module.css"
import { context } from "../App"
import { useContext, useEffect } from "react";
import { useState } from "react";
import Table from "./Table/Table";
import CartNav from "./CartNav/CartNav";

function Cart() {
  const { defineTab, lightMode, cartItems, setCartItems } = useContext(context);

  function selectAll(boolean) {
    setCartItems(prev => prev.map((item) => { return { ...item, isSelected: boolean } }))
  }

  function deleteItem() {
    setCartItems(prev => prev.filter(item => !item.isSelected))
  }


  useEffect(() => {
    if (defineTab) {
      defineTab("/Cart")
    }
  }, [defineTab])
  return (
    <div className={lightMode ? s.cart : `${s.cart} ${s.darkCart}`}>
      <CartNav selectAll={selectAll} cartItems={cartItems}/>
      <Table cartItems={cartItems} setCartItems={setCartItems}/>

      <button className={s.deleteButton} onClick={deleteItem}>
        <i className="far fa-trash-alt"></i>
      </button>
    </div>
  )
}

export default Cart