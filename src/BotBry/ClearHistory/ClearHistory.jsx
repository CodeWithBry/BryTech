import { useContext } from 'react'
import s from './ClearHistory.module.css'
import { context } from '../../App'

function ClearHistory({deleteHistory, setShowClearHistory, showClearHistory}) {
    const { lightMode } = useContext(context)
    if (showClearHistory) return (
        <div className={lightMode ? s.clearHistory : `${s.clearHistory} ${s.darkClearHistory}`}>
            <div className={s.box}>
                <i className='fa fa-trash'></i>
                <h2>Do you want to clear your memory?</h2>
                <div className={s.buttons}>
                    <button onClick={() => { deleteHistory(false) }}>No</button>
                    <button onClick={() => { deleteHistory(true), setShowClearHistory(true) }}>Yes</button>
                </div>
            </div>
        </div>
    )
}

export default ClearHistory