import { useContext, useEffect } from 'react'
import s from './MapProducts.module.css'
import { shopContext } from '../Shop'
import MapSkeleton from './MapSkeleton'

function MapProducts({ items, category }) {
    const { skeletonLoading } = useContext(shopContext)

    if (!skeletonLoading){
        return (
            <>
                {items?.map((item) => {
                    return <div className={s.card} key={item.name}>
                        <div className={s.top}>
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
                                <button>Details <i className='fa fa-align-right'></i></button>
                                <button>Add To Cart <i className='fa fa-shopping-cart'></i></button>
                            </div>
                        </div>
                    </div>
                })}
            </>
        )
    } else {
        return <MapSkeleton />
    }
}

export default MapProducts