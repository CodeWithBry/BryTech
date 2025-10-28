import s from "./Cart.module.css"
import { context } from "../App"
import { useContext, useEffect } from "react";
import { useState } from "react";

function Cart() {
  const { defineTab, lightMode, cartItems, setCartItems } = useContext(context);

  function editQuantity(num, ind) {
    setCartItems(prev => prev.map((item, index) => { return index == ind ? { ...item, count: item.count + num } : { ...item } }))
  }

  function selectAll() {
    setCartItems(prev => prev.map((item, index) => { return { ...item, isSelected: true } }))
  }

  function selectItem(ind) {
    setCartItems(prev => prev.map((item, index) => { return index == ind ? { ...item, isSelected: item.isSelected ? false : true } : { ...item } }))
  }

  useEffect(() => {
    if (defineTab) {
      defineTab("/Cart")
    }
  }, [defineTab])
  return (
    <div className={lightMode ? s.cart : `${s.cart} ${s.darkCart}`}>
      <div className={s.payOut}>

      </div>
      <table>
        {
          cartItems?.map((item, ind) => {
            return <tr className={item.isSelected ? s.selected : s.notSelected}>
              <input
                type="checkbox"
                onChange={() => selectItem(ind)} />
              <td className={s.imgWrapper} style={{ backgroundImage: `url(./products/${item?.category + "s/"}${item?.image})` }}></td>
              <td className={s.right}>
                <h1>{item?.name}</h1>
                <div className={s.actions}>
                  <p className={s.price}>₱ {item?.price_php}</p>
                  <div className={s.editQuantity}>
                    <button onClick={() => { item.count > 1 && editQuantity(-1, ind) }} className={s.minus}><i className="fas fa-minus"></i></button>
                    <input
                      type="number"
                      value={item.count}
                      onChange={(e) => {
                        setCartItems(prev => prev.map((item, index) => { return index == ind ? { ...item, count: e.target.value < 1? Number(e.target.value) * (-1) : Number(e.target.value) } : { ...item } }))
                      }} />
                    <button onClick={() => { item.count < 99 && editQuantity(1, ind) }} className={s.plus}><i className="fas fa-plus"></i></button>
                  </div>
                </div>
              </td>
            </tr>
          })
        }
      </table>
    </div>
  )
}

export default Cart