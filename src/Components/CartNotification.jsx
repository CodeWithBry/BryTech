import { useEffect } from 'react'
import s from './CartNotification.module.css'
import { useRef } from 'react'
import { useContext } from 'react'
import { context } from '../App'

function CartNotification({ ref }) {
    const { setShowCartNotif, showCartNotif } = useContext(context) 
    const timerRef = useRef(null)

    useEffect(() => {
        let timeCooldown = 3000
        function RunCooldown() {
            document.querySelector("#cartNotification").classList.replace(`${s.hideNoAnimation}`, `${s.show}`)
            const el = timerRef.current
            setTimeout(() => {
                el.style.width = `${(timeCooldown / 3000) * 100}%`
                timeCooldown = timeCooldown - 100
                if (timeCooldown > 0) {
                    RunCooldown()
                } else {
                    document.querySelector("#cartNotification").classList.replace(`${s.show}`, `${s.hide}`)
                    setTimeout(()=>{
                        document.querySelector("#cartNotification").classList.replace(`${s.hide}`, `${s.hideNoAnimation}`)
                        setShowCartNotif(false)
                    }, 700)
                }
            }, 100);
        }

        if (showCartNotif && timerRef.current != null) RunCooldown()
    }, [showCartNotif, timerRef])
    return (
        <div className={`${s.cartNotification} ${s.hideNoAnimation}`} id='cartNotification' ref={ref}>
            <i className='	far fa-check-circle'></i>
            <p>Added to Cart</p>
            <div className={s.timerBar}>
                <div className={s.timer} ref={timerRef}></div>
            </div>
        </div>
    )
}

export default CartNotification