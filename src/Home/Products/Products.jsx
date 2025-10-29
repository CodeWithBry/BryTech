import s from './Products.module.css'
import { context } from "../../App"
import { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
function Products() {
    const { lightMode } = useContext(context)
    const itemContainer = useRef()

    const [dropDown, setDropDown] = useState(false)
    const [topProducts, setTopProducts] = useState(null)
    const [productChoices, setProductChoices] = useState([
        { category: "CPU", path: "cpu", isSelected: true },
        { category: "RAM", path: "ram", isSelected: false },
        { category: "Keyboard", path: "key", isSelected: false }
    ])
    const [pickedChoice, setPickedChoice] = useState({ category: "CPU", path: "cpu", isSelected: true })

    async function getData(object) {
        setProductChoices(prev => prev.map((choices) => {
            return choices.category == object.category
                ? { ...choices, isSelected: true }
                : { ...choices, isSelected: false }
        }))

        setPickedChoice(object)

        try {
            const data = await fetch(`/BryTech/products/${object.category}s/${object.path}.json`)
            const res = await data.json()
            const updatedData = res
            setTopProducts(updatedData)
        } catch (error) {

        }
    }

    useEffect(() => {
        if (pickedChoice != null) getData(pickedChoice);
    }, [pickedChoice])

    useEffect(() => {
        const cards = itemContainer.current.querySelectorAll(`.${s.item}`);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(s.active);
                    } else {
                        entry.target.classList.remove(s.active);
                    }
                });
            },
            {
                root: itemContainer.current,
                threshold: .2, // 60% visibility threshold
            }
        );

        cards.forEach((card) => observer.observe(card));

        return () => observer.disconnect();

    }, [itemContainer, s])

    return (
        <div className={lightMode ? s.products : `${s.products} ${s.darkProducts}`}>
            <button onClick={() => dropDown ? setDropDown(false) : setDropDown(true)}>
                <span>Top Selling</span>
                <span className={s.choice}>
                    {" " + pickedChoice.category + " "}
                    <i className={dropDown ? "fa fa-angle-up" : 'fa fa-angle-down'}></i>
                </span>

                <div className={dropDown ? s.dropDown : s.hide}>
                    {
                        productChoices.map((choices) => {
                            return <p
                                className={choices.isSelected ? s.highlight : s.unhighlight}
                                onClick={() => getData(choices)}>{choices.category}</p>
                        })
                    }
                </div>
            </button>

            <div className={s.itemCon} ref={itemContainer}>
                {topProducts != null &&
                    topProducts[0].items?.map((product, i) => {
                        if (i <= 4)
                            return (
                                <div className={s.item} key={i}>
                                    <div className={s.left}>
                                        <img
                                            src={`./products/${pickedChoice.category}s/${product.image}`}
                                            className={s.left}
                                            alt={product.name}
                                        />
                                    </div>
                                    <div className={s.right}>
                                        <h1>{product.name}</h1>
                                        <Link
                                            to={`/Shop/${product.category}s/${product.name
                                                .split(" ")
                                                .join("_")
                                                .toLowerCase()}`}
                                        >
                                            Show Now <i className="fa fa-shopping-bag"></i>
                                        </Link>
                                    </div>
                                </div>
                            );
                    })}
            </div>
        </div>
    )
}

export default Products