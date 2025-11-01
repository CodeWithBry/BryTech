import { useEffect } from 'react'
import s from './ErrorNotification.module.css'
import { useRef } from 'react'
import { useContext } from 'react'
import { context } from '../../App'
import { useNavigate } from 'react-router-dom'

function ErrorNotification({ ref }) {
    const { errorNotif, setErrorNotif, scrollUp } = useContext(context) 
    const timerRef = useRef(null)
    const navigation = useNavigate()

    useEffect(() => {
        let timeCooldown = 3000
        function RunCooldown() {
            document.querySelector("#errorNotification").classList.replace(`${s.hideNoAnimation}`, `${s.show}`)
            const el = timerRef.current
            setTimeout(() => {
                el.style.width = `${(timeCooldown / 3000) * 100}%`
                timeCooldown = timeCooldown - 100
                if (timeCooldown > 0) {
                    RunCooldown()
                } else {
                    document.querySelector("#errorNotification").classList.replace(`${s.show}`, `${s.hide}`)
                    setTimeout(()=>{
                        document.querySelector("#errorNotification").classList.replace(`${s.hide}`, `${s.hideNoAnimation}`)
                        setErrorNotif()
                    }, 700)
                }
            }, 100);
        }

        if (errorNotif && timerRef.current != null) RunCooldown()
    }, [errorNotif, timerRef])
    return (
        <div 
            className={`${s.errorNotification} ${s.hideNoAnimation}`} 
            id='errorNotification' ref={ref}
            onClick={()=>{navigation("/Cart"), scrollUp()}}>
            <i className='	far fa-check-circle'></i>
            <p>{errorNotif}</p>
            <div className={s.timerBar}>
                <div className={s.timer} ref={timerRef}></div>
            </div>
        </div>
    )
}

export default ErrorNotification