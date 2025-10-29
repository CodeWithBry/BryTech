import { useEffect, useState } from 'react'
import s from './CartNav.module.css'

function CartNav({ selectAll, cartItems }) {
    const [allItemCount, setAllItemCount] = useState(0)
    const [totalCost, setTotalCost] = useState(0)
    const [shippingCost, setShippingCost] = useState(0)

    function calculateAll() {
        let total = 0
        let shippingTotal = 0
        let totalItems = 0
        cartItems.map((item) => {
            if (item.isSelected) {
                totalItems += item.count
                total += (Number(item.price_php.split(", ").join("")) * item.count)
                shippingTotal += (Number(item.shipping_fee_php) * item.count)
            }
        })

        setAllItemCount(totalItems)
        setTotalCost(total.toLocaleString())
        setShippingCost(shippingTotal.toLocaleString())
    }

    useEffect(() => {
        if (cartItems) {
            calculateAll()
        }
    }, [cartItems])
    return (
        <div className={s.cartNav}>
            <div className={s.left}>
                <input type="checkbox" onChange={(e) => { selectAll(e.target.checked) }} />
                <p>All</p>
            </div>
            <div className={s.right}>
                <div className={s.contents}>
                    <p className={s.totalCost}>Total Cost: ₱ {totalCost}</p>
                    <p className={s.shippingFee}>Shipping Cost: ₱ {shippingCost}</p>
                </div>
                <button className={s.checkOut}>Check Out ({allItemCount})</button>
            </div>
        </div>
    )
}

export default CartNav