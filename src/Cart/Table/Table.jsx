import { useContext, useEffect, useState } from 'react'
import s from './Table.module.css'
import { context } from "../../App"

function Table({ cartItems, setCartItems, navigation, sortingMethod }) {
    const { lightMode } = useContext(context)
    const [itemsInCart, setItemsInCart] = useState(null)
    const [itemsToDeliver, setItemsToDeliver] = useState(null)

    function editQuantity(num, ind) {
        setCartItems(prev => prev.map((item, index) => { return index == ind ? { ...item, count: item?.count + num } : { ...item } }))
    }

    function selectItem(boolean, ind) {
        setCartItems(prev => prev.map((item, index) => { return index == ind ? { ...item, isSelected: boolean } : { ...item } }))
    }

    useEffect(() => {
        if (cartItems) {
            setItemsInCart(cartItems.filter(item => item.status == "Cart"))
            setItemsToDeliver(cartItems.filter(item => item.status != "Cart"))
        }
    }, [cartItems])

    return (
        <>
            {(itemsInCart?.length == 0 && sortingMethod == "Cart") &&
                <div className={lightMode ? s.noItems : `${s.noItems} ${s.darkNoItems}`}>
                    <div className={s.box}>
                        <h2>There are no items in your cart!</h2>
                        <button onClick={() => { navigation("/Shop") }}>Shop Now <i className='fa fa-shopping-cart'></i></button>
                    </div>
                </div>
            }
            {(itemsToDeliver?.length == 0 && sortingMethod == "To Deliver") &&
                <div className={lightMode ? s.noItems : `${s.noItems} ${s.darkNoItems}`}>
                    <div className={s.box}>
                        <h2>There are no items in your cart!</h2>
                        <button onClick={() => { navigation("/Shop") }}>Shop Now <i className='fa fa-shopping-cart'></i></button>
                    </div>
                </div>
            }
            {cartItems?.length != 0 && <table className={!lightMode && `${s.darkTable}`}>
                <tbody>
                    {
                        cartItems?.map((item, ind) => {
                            if (sortingMethod?.toLowerCase() == item?.status?.toLowerCase()) return <tr
                                className={item?.isSelected ? s.selected : s.notSelected}
                                key={item?.name}>
                                <td
                                    className={s.imgWrapper}
                                    style={{ backgroundImage: `url(./products/${item?.category + "s/"}${item?.image})` }}
                                    onClick={() => { navigation(`/Shop/Products/${item.name.split(" ").join("_").toLowerCase()}`) }}></td>
                                <td className={s.right}>
                                    <h1 onClick={() => navigation(`/Shop/Products/${item.name.split(" ").join("_").toLowerCase()}`)}>{item?.name}</h1>
                                    <input
                                        type="checkbox"
                                        checked={item?.isSelected}
                                        onChange={(e) => selectItem(e.target.checked, ind)} />
                                    <div className={s.actions}>

                                        <p className={s.price}>₱ {item?.price_php}</p>
                                        <div className={s.editQuantity}>
                                            {sortingMethod == "Cart" && <button onClick={() => { item?.count > 1 && editQuantity(-1, ind) }} className={s.minus}><i className="fas fa-minus"></i></button>}
                                            <input
                                                type="number"
                                                value={item?.count}
                                                onChange={(e) => {
                                                    if (sortingMethod == "Cart") setCartItems(prev => prev.map((cartItem) => {
                                                        if (item?.count && cartItem.name == item.name) {
                                                            if (e.target.value < 0 || e.target.value == "") {
                                                                return { ...cartItem, count: 1 }
                                                            }

                                                            else if (e.target.value > 99) {
                                                                return { ...cartItem, count: 99 }
                                                            }

                                                            else return { ...cartItem, count: Number(e.target.value) }

                                                        }

                                                        return { ...cartItem }
                                                    }))
                                                }} />
                                            {sortingMethod == "Cart" && <button onClick={() => { item?.count < 99 && editQuantity(1, ind) }} className={s.plus}><i className="fas fa-plus"></i></button>}
                                        </div>
                                    </div>
                                    {
                                        sortingMethod == "To Deliver" &&
                                        (<div className={s.details}>
                                            <p> <i className='fas fa-truck'></i> {item?.dateDeliver}</p>
                                            <button
                                                className={s.cancelOrder}
                                                onClick={() => {
                                                    setCartItems(prev => prev.map((cartItem) => {
                                                        if (cartItem?.name == item?.name) return { ...cartItem, status: "Cart", isSelected: false }
                                                        return { ...cartItem }
                                                    }))
                                                }}
                                            >Cancel Order</button>
                                        </div>)
                                    }
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>}
        </>

    )
}

export default Table