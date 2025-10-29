import s from "./Cart.module.css"
import { context } from "../App"
import { useContext, useEffect } from "react";
import Table from "./Table/Table";
import CartNav from "./CartNav/CartNav";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigation = useNavigate()
  const { defineTab, lightMode, cartItems, setCartItems } = useContext(context);

  function selectAll(boolean) {
    setCartItems(prev => prev.map((item) => { return { ...item, isSelected: boolean } }))
  }

  function deleteItem() {
    setCartItems(prev => {
      const updatedItems = prev.filter(item => !item.isSelected)
      saveToSessionStorage(updatedItems)
      return updatedItems
    })
  }

  function saveToSessionStorage(items) {
    localStorage.setItem("cartItems", JSON.stringify(items))
  }

  useEffect(() => {
    if (defineTab) {
      defineTab("/Cart")
    }
  }, [defineTab])
  return (
    <div className={lightMode ? s.cart : `${s.cart} ${s.darkCart}`}>
      <CartNav selectAll={selectAll} cartItems={cartItems}/>
      <Table cartItems={cartItems} setCartItems={setCartItems} navigation={navigation}/>

      <button className={s.deleteButton} onClick={deleteItem}>
        <i className="far fa-trash-alt"></i>
      </button>
    </div>
  )
}

export default Cart