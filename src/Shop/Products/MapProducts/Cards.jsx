import { useContext } from 'react'
import s from './MapProducts.module.css'
import { shopContext } from '../../Shop'
import { context } from '../../../App'
import { useNavigate } from 'react-router-dom'

function Cards({item, category}) {
    const {setSelectedItem} = useContext(shopContext)
    const {scrollUp, addToCart} = useContext(context)
    const navigation = useNavigate(null)

    return (
     <div className={s.card} key={item.name}>
        <div className={s.top} onClick={()=>{navigation(`/Shop/${item.category}s/${item.name.split(" ").join("_").toLowerCase()}`), scrollUp(), setSelectedItem(item)}}>
            <img src={category == "All" ? `./products/${category}/${item.image}` : `./products/${category}/${item.image}`} />
        </div>
        <div className={s.contents}>
            <h2>{item.name}</h2>
            <p>{item.brand}</p>
            <p>{item.gen}</p>
        </div>
        <div className={s.bottom}>
            <p>₱ {item.price_php}</p>
            <div className={s.actions}>
                <button className={s.details} onClick={()=>{navigation(`/Shop/${item.category}s/${item.name.split(" ").join("_").toLowerCase()}`), scrollUp(), setSelectedItem(item)}}>Details <i className='fa fa-align-right'></i></button>
                <button className={s.cart} onClick={()=>{addToCart(item)}}>Cart <i className='fa fa-shopping-cart'></i></button>
            </div>
        </div>
    </div>
  )
}

export default Cards