import { useContext, useEffect } from 'react'
import s from './Products.module.css'
import { shopContext } from '../Shop'
import MapProducts from './MapProducts'

function Products() {
    const { lightMode, itemLists, selectedProduct } = useContext(shopContext)

    return (
        <div className={lightMode ? s.products : `${s.products} ${s.darkProducts}`}>
            {itemLists?.length > 1 ?
                itemLists?.map((products) => {
                    return <>
                        <h1>{products.category}</h1>
                        <div className={s.wrapItems}>
                            <MapProducts items={products?.items} category={products.category} />
                        </div>
                    </>
                }) :
                itemLists?.category != null &&<>
                    <h1>{itemLists?.category}</h1>
                    <div className={s.wrapItems}>
                        <MapProducts items={itemLists?.items} category={selectedProduct.name} />
                    </div>
                </>}

        </div>
    )
}

export default Products