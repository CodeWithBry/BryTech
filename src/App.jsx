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

export const context = createContext();

function App() {
    const location = useLocation()
    // REFS
    const wrapperRef = useRef(null)

    // BOOLEAN
    const [lightMode, setLightMode] = useState(true);

    // STRING
    const [path, setPath] = useState("")

    // NUMBERS

    // ARRAY AND OBJECTS
    const [tabs, setTabs] = useState([
        { name: "Home", element: Home, path: `/`, icon: "fa fa-home", isSelected: true },
        { name: "Shop", element: Shop, path: `/Shop`, icon: "fa fa-shopping-bag", isSelected: false },
        { name: "Cart", element: Cart, path: `/Cart`, icon: "fa fa-shopping-cart", isSelected: false },
        { name: "BotBry", element: BotBry, path: `/BotBry`, icon: "fas fa-robot", isSelected: false },
        { name: "About", element: About, path: `/About`, icon: "fa fa-info", isSelected: false },
        { name: "Docs", element: Docs, path: `/Docs`, icon: "fa fa fa-code", isSelected: false },
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
        setCartItems(prev => [...prev, newItem])
        console.log([...cartItems, newItem])
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
        // strings
        path, setPath,
        location,
        // numbers
        // arrays & objects
        tabs, setTabs,
        prevTabs, setPrevTabs,

        // functions
        defineTab, scrollUp,
        addToCart
    };

    return (
        <context.Provider value={variables}>
            <div className={s.wrapper} ref={wrapperRef}>
                <Nav />
                <Routes>
                    {tabs?.map((tab) => {
                        const Component = tab.element
                        return <Route path={tab.path} element={<><Component /> <Footer TopElement={wrapperRef} /></>} />
                    })}
                    <Route path='/Shop/:productCategory' element={<><Shop /> <Footer TopElement={wrapperRef} /></>} />
                    <Route path='/Shop/:productCategory/:productName' element={<><Shop /> <Footer TopElement={wrapperRef} /></>} />
                    <Route path='/Shop/Search/:searchDescription' element={<><Shop /> <Footer TopElement={wrapperRef} /></>} />
                </Routes>
            </div>
        </context.Provider>
    )
}

export default App
