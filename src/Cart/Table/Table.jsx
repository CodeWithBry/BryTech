import s from './Table.module.css'

function Table({ cartItems, setCartItems }) {


    function editQuantity(num, ind) {
        setCartItems(prev => prev.map((item, index) => { return index == ind ? { ...item, count: item?.count + num } : { ...item } }))
    }

    function selectItem(boolean, ind) {
        setCartItems(prev => prev.map((item, index) => { return index == ind ? { ...item, isSelected: boolean } : { ...item } }))
    }

    return (
        <table>
            <tbody>
                {
                    cartItems?.map((item, ind) => {
                        return <tr 
                            className={item?.isSelected ? s.selected : s.notSelected} 
                            key={item?.name}>
                            <td className={s.imgWrapper} style={{ backgroundImage: `url(./products/${item?.category + "s/"}${item?.image})` }}></td>
                            <td className={s.right}>
                                <h1>{item?.name}</h1>
                                <input
                                    type="checkbox"
                                    checked={item?.isSelected}
                                    onChange={(e) => selectItem(e.target.checked, ind)} />
                                <div className={s.actions}>

                                    <p className={s.price}>₱ {item?.price_php}</p>
                                    <div className={s.editQuantity}>
                                        <button onClick={() => { item?.count > 1 && editQuantity(-1, ind) }} className={s.minus}><i className="fas fa-minus"></i></button>
                                        <input
                                            type="number"
                                            value={item?.count}
                                            onChange={(e) => {
                                                setCartItems(prev => prev.map((cartItem) => {
                                                    if (item?.count && cartItem.name == item.name) {
                                                        if(e.target.value < 0 || e.target.value == "") {
                                                            return {...cartItem, count: 1}
                                                        }

                                                        else if(e.target.value > 99) {
                                                            return {...cartItem, count: 99}
                                                        }

                                                        else return {...cartItem, count: Number(e.target.value)}
                                                            
                                                    }

                                                    return {...cartItem}
                                                }))
                                            }} />
                                        <button onClick={() => { item?.count < 99 && editQuantity(1, ind) }} className={s.plus}><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}

export default Table