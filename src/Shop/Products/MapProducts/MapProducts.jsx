import { useContext, useEffect } from 'react'
import s from './MapProducts.module.css'
import { shopContext } from '../../Shop'
import MapSkeleton from './MapSkeleton'
import Cards from './Cards'

function MapProducts({ items, category }) {
    const { skeletonLoading } = useContext(shopContext)

    if (!skeletonLoading) {
        return (
            <>
                {items?.map((item) => {
                    return <Cards item={item} category={category != null ? category : item.category + "s"} />
                })}
            </>
        )
    } else {
        return <MapSkeleton />
    }
}

export default MapProducts