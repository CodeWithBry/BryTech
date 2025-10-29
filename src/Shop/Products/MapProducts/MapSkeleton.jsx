import { useContext } from 'react'
import s from './MapProducts.module.css'
import { context } from '../../../App'

function MapSkeleton() {
	const { lightMode } = useContext(context)

	return (
		<>
			{
				Array.from({ length: 20 }).map((_, i) => {
					return <div className={lightMode ? s.skeletonLoader : `${s.skeletonLoader} ${s.darkSkeletonLoader}`} key={Math.random() * i}>
						<div className={s.shadow}></div>
					</div>
				})
			}
		</>
	)
}

export default MapSkeleton