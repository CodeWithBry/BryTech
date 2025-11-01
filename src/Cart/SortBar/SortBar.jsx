import  { useContext } from 'react'
import { context } from '../../App'
import s from "./SortBar.module.css"

function SortBar({sortingMethod, setSortingMethod}) {
    const { lightMode } = useContext(context)
    return (
        <div className={lightMode ? s.sortBar : `${s.sortBar} ${s.darkSortBar}`}>
            <button 
                className={sortingMethod == "Cart" && s.highlight }
                onClick={()=>{setSortingMethod("Cart")}}>Cart</button>
            <button
                className={sortingMethod == "To Deliver" && s.highlight } 
                onClick={()=>{setSortingMethod("To Deliver")}}>To Deliver</button>
        </div>
    )
}

export default SortBar