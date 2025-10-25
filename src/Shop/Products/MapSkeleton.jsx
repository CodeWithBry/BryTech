import s from './MapProducts.module.css'

function MapSkeleton() {
  return (
    <>
        {
            Array.from({length: 6}).map((_, i)=>{
                return <div className={s.skeletonLoader} key={Math.random() * i}>

                </div>
            }) 
        }
    </>
  )
}

export default MapSkeleton