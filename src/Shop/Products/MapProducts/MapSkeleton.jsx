import s from './MapProducts.module.css'

function MapSkeleton() {
  return (
    <>
        {
            Array.from({length: 20}).map((_, i)=>{
                return <div className={s.skeletonLoader} key={Math.random() * i}>
                  <div className={s.shadow}></div>
                </div>
            }) 
        }
    </>
  )
}

export default MapSkeleton