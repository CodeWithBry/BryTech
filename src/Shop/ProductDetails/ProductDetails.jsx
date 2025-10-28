import s from './ProductDetails.module.css'
import { context } from "../../App"
import { shopContext } from '../Shop'
import { useContext, useEffect, useState } from 'react'
function ProductDetails() {
    const { lightMode, addToCart } = useContext(context)
    const { selectedItem } = useContext(shopContext)
    const [showMore, setShowMore] = useState(false)

    return (
        <div className={s.productWrapper}>
            <div className={lightMode ? s.productDetails : `${s.productDetails} ${s.darkProductDetails}`}>
                <div className={s.left} style={{backgroundImage: `url('./products/${selectedItem?.category + "s/"}${selectedItem?.image}')`}}>
                </div>
                <div className={s.right}>
                    <h1>{selectedItem?.name}</h1>
                    <div className={s.details}>
                        <div className={showMore ? s.showAll : s.minify}>
                            <p>{selectedItem?.paragraph}</p>
                            <button className={showMore ? s.show : s.hide} onClick={() => showMore ? setShowMore(false) : setShowMore(true)}> <span>{showMore ? "Show Less" : "Show More"}</span> </button>
                        </div>
                        <div className={s.columns}>
                            <div className={`${s.col} ${s.col1}`}>
                                <p>Specs: {selectedItem?.specs}</p>
                                <p>Brand: {selectedItem?.brand}</p>
                            </div>
                            <div className={`${s.col} ${s.col2}`}>
                                <p>Generation: {selectedItem?.gen}</p>
                                <p>Category: {selectedItem?.category}</p>
                            </div>
                        </div>
                    </div>
                    <div className={s.actions}>
                        <p className={s.price}>₱ {selectedItem?.price_php}</p>
                        <div className={s.buttons}>
                            <button className={s.cart} onClick={()=>addToCart(selectedItem)}>Cart <i className='fa fa-shopping-cart'></i></button>
                            <button>Buy <i className='far fa-credit-card'></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails