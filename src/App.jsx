import s from './App.module.css'
import { createContext, useRef } from 'react'
import { useState } from 'react';
import { Routes, Route } from "react-router-dom"

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
    // REFS
    const wrapperRef = useRef(null)

    // BOOLEAN
    const [lightMode, setLightMode] = useState(true);

    // STRING

    // NUMBERS

    // ARRAY AND OBJECTS
    const [tabs, setTabs] = useState([
        { name: "Home", element: Home , path: `/`, icon: "fa fa-home", isSelected: true },
        { name: "Shop", element: Shop , path: `/Shop`, icon: "fa fa-shopping-bag", isSelected: false },
        { name: "Cart", element: Cart , path: `/Cart`, icon: "fa fa-shopping-cart", isSelected: false },
        { name: "BotBry", element: BotBry , path: `/BotBry`, icon: "fa fa-commenting", isSelected: false },
        { name: "About", element: About , path: `/About`, icon: "fa fa-info", isSelected: false },
        { name: "Docs", element: Docs , path: `/Docs`, icon: "fa fa fa-code", isSelected: false },
    ])

    // FUNCTIONS
    function defineTab(path) {
        setTabs(prev => prev.map((tab) => {
            return tab.path == path ?
                { ...tab, isSelected: true } :
                { ...tab, isSelected: false }
        }))
    }

    // EFFECTS

    const variables = {
        //boolean
        lightMode, setLightMode,
        // strings
        // numbers
        // arrays & objects
        tabs, setTabs,

        // functions
        defineTab
    };

    return (
        <context.Provider value={variables}>
            <div className={s.wrapper} ref={wrapperRef}>
                <Nav />
                <Routes>
                    {tabs?.map((tab) => {
                        const Component = tab.element
                        
                        return <Route path={tab.path} element={<><Component /> <Footer TopElement={wrapperRef}/></>} />
                    })}
                    <Route path='/Shop/:productCategory' element={<><Shop /> <Footer TopElement={wrapperRef}/></>}/>
                </Routes>
            </div>
        </context.Provider>
    )
}

export default App
