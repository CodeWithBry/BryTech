import s from './App.module.css'
import { createContext, useEffect, useRef } from 'react'
import { useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom"

// TABS

import Home from "./Home/Home"
import Shop from "./Shop/Shop"
import Cart from "./Cart/Cart"
import BotBry from "./BotBry/BotBry"
import About from "./About/About"
import Docs from "./Docs/Docs"

// COMPONENTS
import Nav from "./Nav/Nav"
import Footer from './Footer/Footer';
import CartNotification from './Components/CartNotification/CartNotification';
import CheckOut from './Components/CheckOut/CheckOut';
import ErrorNotification from './Components/ErrorNotification/ErrorNotification';

export const context = createContext();

function App() {
    const location = useLocation()
    // REFS
    const wrapperRef = useRef(null)
    const cartNotificationRef = useRef(null)
    const errorNotificationRef = useRef(null)

    // BOOLEAN
    const [lightMode, setLightMode] = useState(true);
    const [showCartNotif, setShowCartNotif] = useState(false)
    const [showPurchase, setShowPurchase] = useState(false)

    // STRING
    const [path, setPath] = useState("")
    const [errorNotif, setErrorNotif] = useState(null)

    // NUMBERS

    // ARRAY AND OBJECTS
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [tabs, setTabs] = useState([
        { name: "Home", element: Home, path: `/`, icon: "fa fa-home", hideComponents: true, isSelected: true },
        { name: "Shop", element: Shop, path: `/Shop`, icon: "fa fa-shopping-bag", hideComponents: true, isSelected: false },
        { name: "Cart", element: Cart, path: `/Cart`, icon: "fa fa-shopping-cart", hideComponents: true, isSelected: false },
        { name: "BotBry", element: BotBry, path: `/BotBry`, icon: "fas fa-robot", hideComponents: true, isSelected: false },
        { name: "About", element: About, path: `/About`, icon: "fa fa-info", hideComponents: true, isSelected: false },
        { name: "Docs", element: Docs, path: `/Docs`, icon: "fa fa fa-code", hideComponents: true, isSelected: false },
    ])
    const [prevTabs, setPrevTabs] = useState([])
    const [cartItems, setCartItems] = useState([])

    // FUNCTIONS
    function defineTab(path) {
        setTabs(prev => prev.map((tab) => {

            if (tab.path == path) {
                setPath(tab.path)
                return { ...tab, isSelected: true }
            } else {
                return { ...tab, isSelected: false }
            }

        }))

    }

    function scrollUp() {
        wrapperRef.current.scrollTo({ top: 0, behavior: "smooth" })
    }

    function addToCart(newItem) {
        setCartItems(prev => {
            const updatedCart = prev.map((item) => {
                if (item.name == newItem.name) {
                    return { ...item, count: item?.count != null ? item.count + 1 : 1 }
                }

                return { ...item }
            })
            const twoDaysFromNow = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
            const formatted = twoDaysFromNow.toLocaleString("default", { month: "long", day: "numeric" });
            const addedProduct = [{ ...newItem, count: newItem?.count != null ? item.count + 1 : 1, isSelected: false, status: "Cart", dateDeliver: formatted }, ...prev]

            function checkCart() {
                for (let i in prev) {
                    if (newItem.name == cartItems[i].name) return "Same"
                }
            }

            if (checkCart() == "Same") {
                localStorage.setItem("cartItems", JSON.stringify(updatedCart))
                return [...updatedCart]
            } else {
                localStorage.setItem("cartItems", JSON.stringify(addedProduct))
                return [...addedProduct]
            }

        })
    }

    // EFFECTS
    useEffect(() => {
        function getPath() {
            const url = window.location.href
            const pathURL = url.slice(url.lastIndexOf("/#/") + 2)
            setPath(pathURL)
        }
        if (location) getPath()
    }, [location])

    useEffect(() => {
        const cartItemsStorage = JSON.parse(localStorage.getItem("cartItems"))
        if (cartItemsStorage != null) {
            setCartItems([...cartItemsStorage])
        }
    }, [])

    const variables = {
        //boolean
        lightMode, setLightMode,
        showCartNotif, setShowCartNotif,
        showPurchase, setShowPurchase,
        // strings
        path, setPath,
        location,
        errorNotif, setErrorNotif,
        // numbers
        // arrays & objects
        selectedProduct, setSelectedProduct,
        tabs, setTabs,
        prevTabs, setPrevTabs,
        cartItems, setCartItems,

        // functions
        defineTab, scrollUp,
        addToCart,

        // refs
        wrapperRef
    };

    return (
        <context.Provider value={variables}>
            <div className={s.wrapper} ref={wrapperRef}>
                <Nav />
                <CartNotification ref={cartNotificationRef} />
                <ErrorNotification ref={errorNotificationRef} />
                <CheckOut />
                <Routes>
                    {tabs?.map((tab) => {
                        const Component = tab.element
                        const hideComponents = tab.hideComponents
                        return <Route path={tab.path} element={<><Component hideComponents={hideComponents} />{tab.name != "BotBry" && <Footer TopElement={wrapperRef} />}</>} />
                    })}
                    <Route path='/Shop/:productCategory' element={<><Shop /><Footer TopElement={wrapperRef} /></>} />
                    <Route path='/Shop/Products/:productName' element={<><Shop /><Footer TopElement={wrapperRef} /></>} />
                    <Route path='/Shop/Search/:searchDescription' element={<><Shop /><Footer TopElement={wrapperRef} /></>} />
                    <Route path='/BotBry/:convoId' element={<><BotBry /></>} />
                    <Route path='/Docs/:subLink' element={<><Docs /></>} />
                </Routes>

            </div>
        </context.Provider>
    )
}

export default App
