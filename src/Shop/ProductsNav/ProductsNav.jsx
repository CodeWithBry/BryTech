import s from './ProductsNav.module.css'
import { shopContext } from '../Shop'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
function ProductsNav() {
    const {lightMode, productLists, setSelectedProduct} = useContext(shopContext)
    return (
        <div className={lightMode ? s.productsNav : `${s.productsNav} ${s.darkProductsNav}`}>
            {productLists.map((product)=> {
                return <Link 
                    to={`/Shop/${product.name}`}
                    className={product.isSelected ? `${s.link} ${s.highlight}` : s.link}
                    key={product.endPoint}
                    onClick={()=>{
                        setSelectedProduct(product)
                    }}>
                    {product.name}
                </Link>
            })}
        </div>
    )
}

export default ProductsNav