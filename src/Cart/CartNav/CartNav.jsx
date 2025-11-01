import { useContext, useEffect, useState } from 'react'
import s from './CartNav.module.css'
import { context } from '../../App'

function CartNav({ selectAll, cartItems, sortingMethod }) {
    const { lightMode, setShowPurchase } = useContext(context)

    const [allItemCount, setAllItemCount] = useState(0)
    const [totalCost, setTotalCost] = useState(0)
    const [shippingCost, setShippingCost] = useState(0)

    function calculateAll() {
        let total = 0
        let shippingTotal = 0
        let totalItems = 0
        if (sortingMethod == "Cart") {
            cartItems.map((item) => {
                if (item.isSelected && item.status == "Cart") {
                    totalItems += item.count
                    total += ((Number(item.price_php.split(", ").join("")) + Number(item.shipping_fee_php)) * item.count)
                    shippingTotal += (Number(item.shipping_fee_php) * item.count)
                }
            })
        } else {
            cartItems.map((item) => {
                if (item.status == "To Deliver") {
                    totalItems += item.count
                    total += ((Number(item.price_php.split(", ").join("")) + Number(item.shipping_fee_php)) * item.count)
                    shippingTotal += (Number(item.shipping_fee_php) * item.count)
                }
            })
        }

        setAllItemCount(totalItems)
        setTotalCost(total.toLocaleString())
        setShippingCost(shippingTotal.toLocaleString())
    }

    useEffect(() => {
        if (cartItems) {
            calculateAll()
        }
    }, [cartItems, sortingMethod])
    return (
        <div className={lightMode ? s.cartNav : `${s.cartNav} ${s.darkCartNav}`}>
            <div className={s.left}>
                <input type="checkbox" onChange={(e) => { selectAll(e.target.checked) }} />
                <p>All</p>
            </div>
            <div className={s.right}>
                <div className={s.contents}>
                    <p className={s.totalCost}>Total Cost: ₱ {totalCost}</p>
                    <p className={s.shippingFee}>Shipping Cost: ₱ {shippingCost}</p>
                </div>
                {sortingMethod == "Cart" ? (<button className={s.checkOut} onClick={() => setShowPurchase(true)}>Check Out ({allItemCount})</button>) : null}
            </div>
        </div>
    )
}

export default CartNav