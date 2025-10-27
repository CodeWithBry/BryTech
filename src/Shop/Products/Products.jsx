import { useContext, useEffect, useRef } from 'react'
import s from './Products.module.css'
import { shopContext } from '../Shop'
import MapProducts from './MapProducts/MapProducts'
import { Link } from 'react-router-dom'

function Products() {
    const { lightMode, itemLists, selectedCategory, searchDescription, productName, skeletonLoading } = useContext(shopContext)
    const productsRef = useRef(null)

    if (itemLists != null && !skeletonLoading) {
        return (
            <div className={lightMode ? s.products : `${s.products} ${s.darkProducts}`} ref={productsRef}>
                {itemLists?.length > 1 ?
                    itemLists?.map((products) => {
                        return <>
                            <h1>{products.category}</h1>
                            <div className={s.wrapItems}>
                                <MapProducts items={products?.items} category={products.category} />
                            </div>
                        </>
                    }) :
                    (itemLists[0]) && <>
                        <h1>
                            {searchDescription ? `Searches: ${searchDescription}` : itemLists[0]?.category}
                            {productName && <Link className={s.back} onClick={() => { productsRef.current.scrollIntoView({ behavior: "smooth" }) }} to={`/Shop/${selectedCategory?.name}`}>Back</Link>}
                        </h1>
                        <div className={s.wrapItems}>
                            <MapProducts items={itemLists[0]?.items} category={searchDescription ? null : selectedCategory?.name} />
                        </div>
                    </>}
            </div>
        )
    } else if (skeletonLoading) {
        return <div className={lightMode ? s.products : `${s.products} ${s.darkProducts}`} ref={productsRef}>
            <h1>
                <span>Searches: {searchDescription}</span>
                <Link className={s.back} onClick={() => { productsRef.current.scrollIntoView({ behavior: "smooth" }) }} to={`/Shop/All`}>Back</Link>
            </h1>
            <div className={s.wrapItems}>
                <MapProducts items={null} category={null} />
            </div>
        </div>
    }
}

export default Products