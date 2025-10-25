import { useContext } from 'react'
import s from './Banner.module.css'
import { shopContext } from '../Shop'

function Banner() {
  const {selectedProduct} = useContext(shopContext)

  return (
    <div className={s.banner}>
        <h1><span>Build Smarter</span>Upgrade Faster</h1>
    </div>
  )
}

export default Banner