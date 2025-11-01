import s from "./Cart.module.css"
import { context } from "../App"
import { useContext, useEffect, useState } from "react";
import Table from "./Table/Table";
import CartNav from "./CartNav/CartNav";
import { useNavigate } from "react-router-dom";
import SortBar from "./SortBar/SortBar";

function Cart() {
  const navigation = useNavigate()
  const { defineTab, lightMode, cartItems, setCartItems } = useContext(context);
  const [sortingMethod, setSortingMethod] = useState("Cart")

  function selectAll(boolean) {
    setCartItems(prev => prev.map((item) => { 
      if(sortingMethod == item?.status) return { ...item, isSelected: boolean } 
      return {...item}
    }))
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
      <CartNav
        selectAll={selectAll}
        cartItems={cartItems}
        sortingMethod={sortingMethod} setSortingMethod={setSortingMethod} />
      <SortBar
        sortingMethod={sortingMethod}
        setSortingMethod={setSortingMethod} />
      <Table
        cartItems={cartItems}
        setCartItems={setCartItems}
        navigation={navigation}
        sortingMethod={sortingMethod}
        setSortingMethod={setSortingMethod} />

      <button className={s.deleteButton} onClick={deleteItem}>
        <i className="far fa-trash-alt"></i>
      </button>
    </div>
  )
}

export default Cart