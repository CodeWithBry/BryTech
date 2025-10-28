import s from "./Shop.module.css"
import { context } from "../App"
import { createContext, useContext, useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import ProductsNav from "./ProductsNav/ProductsNav";
import Products from "./Products/Products";
import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import ProductDetails from "./ProductDetails/ProductDetails";

export const shopContext = createContext()

function Shop() {
    const { defineTab, lightMode, path } = useContext(context);
    const { productCategory, searchDescription, productName } = useParams();
    const navigation = useNavigate()
    const params = productCategory;
    const nameParams = productName

    const [skeletonLoading, setSkeletonLoading] = useState(false)
    const [prevSearch, setPrevSearch] = useState(searchDescription)

    const [selectedItem, setSelectedItem] = useState(null)
    const [allProducts, setAllProducts] = useState(null)
    const [resultedData, setResultedData] = useState()
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [categoryLists, setCategoryLists] = useState([
        { name: "All", endPoint: `/BryTech/products/All/all.json`, banner: "./Shop/sysunitBanner.jpg", isSelected: true },
        { name: "CPUs", endPoint: `/BryTech/products/CPUs/cpu.json`, banner: "./Shop/cpuBanner.jpg", isSelected: false },
        { name: "RAMs", endPoint: `/BryTech/products/RAMs/ram.json`, banner: "./Shop/ramBanner.jpg", isSelected: false },
        // { name: "GPU", endPoint: `/BryTech/products/Keyboards/cpu.json`, isSelected: false },
        // { name: "Motherboard", endPoint: `/BryTech/products//cpu.json`, isSelected: false },
        { name: "Keyboards", endPoint: `/BryTech/products/Keyboards/key.json`, banner: "./Shop/keyBanner.jpg", isSelected: false },
        // { name: "Mouse", endPoint: `/BryTech/products//cpu.json`, isSelected: false },
    ])
    const [itemLists, setItemLists] = useState(null)

    async function fetchData() {
        try {
            const req = await fetch("/BryTech/products/All/all.json")
            return req.json()
        } catch (error) {
            console.log(error)
        }
    }

    async function handleSearch(key, input) {
        if (key == "Enter" || key == null) {
            if (!window.location.href.includes("Search") && searchDescription == null && input == null) {
                navigation("/Shop")
                return
            }
            setSelectedItem(null)
            navigation(`/Shop/Search/${input}`)
            setSkeletonLoading(true)
            const req = await fetchData()
            const resultedData = []
            for (let i in req) {
                req[i].items.filter(item => {
                    input.split(" ").filter((word) => {
                        if (item.name.toLowerCase().includes(word.toLowerCase())
                            || item.category.toLowerCase().includes(word.toLowerCase())
                            || item.brand.toLowerCase().includes(word.toLowerCase())) {
                            resultedData.push(item)
                        }
                    })
                })
            }
            setResultedData(resultedData)
            setSkeletonLoading(false)
        }
    }

    async function handleFindProduct(name) {
        if (!window.location.href.includes("Products") && name == null && productName == null) {
            setSelectedItem(null)
            navigation("/Shop")
            return
        }
        navigation(`/Shop/Products/${name}`)
        const req = await fetchData()
        for (let i in req) {
            req[i].items.filter(item => {
                if (item.name.toLowerCase().split(" ").join("_") == name.toLowerCase()) {
                    setSelectedItem(item)
                }
            })
        }
    }



    useEffect(() => {
        defineTab("/Shop")
        return () => fetchData().then(products => setAllProducts(products))
    }, [])

    useEffect(() => {
        if (selectedCategory) {
            setSkeletonLoading(true)
            async function fetchProducts(product) {
                try {
                    const getData = await fetch(product.endPoint)
                    const data = await getData.json()
                    setItemLists([...data])
                } catch (error) {
                    console.log(error)
                } finally {
                    setSkeletonLoading(false)
                }
            }

            fetchProducts(selectedCategory);
        }
    }, [selectedCategory])


    useEffect(() => {
        if (resultedData) {
            setItemLists([{ category: searchDescription, items: [...resultedData] }])
        }
    }, [resultedData])

    useEffect(() => {
        if (params && searchDescription == null) {
            setSelectedItem(null)
            setCategoryLists(prev => prev.map((product) => {
                if (product.name.toLowerCase() == params.toLowerCase()) {
                    const newCategory = product
                    newCategory.isSelected = true
                    setSelectedCategory(newCategory)
                    return { ...product, isSelected: true }
                }

                return { ...product, isSelected: false }
            }))
        } else if (searchDescription == null) {
            setCategoryLists(prev => prev.map((product) => {
                if (product.name.toLowerCase() == "all") {
                    const newProduct = product
                    newProduct.isSelected = true
                    setSelectedCategory(newProduct)
                    return { ...product, isSelected: true }
                }

                return { ...product, isSelected: false }
            }))
        }
    }, [params, searchDescription])

    useEffect(() => {
        setTimeout(() => {
            if (nameParams && searchDescription == null) {
                handleFindProduct(nameParams)
            } else if (nameParams == null && searchDescription) {
                setSelectedItem(null)
                handleFindProduct(null)
                handleSearch(null, searchDescription)
            } else {
                handleFindProduct(null)
                handleSearch(null, null)
            }
        }, 500);
    }, [nameParams, searchDescription])


    const variable = {
        //boolean
        skeletonLoading, setSkeletonLoading,
        // strings
        searchDescription, productName,
        // numbers
        // arrays & objects
        selectedItem, setSelectedItem,
        selectedCategory, setSelectedCategory,
        categoryLists, setCategoryLists,
        itemLists, setItemLists, //Lists of items per category or actual products
        resultedData, setResultedData, //Fetched Data or filtered data
        allProducts, setAllProducts, //All of the product inside all.json
        // functions
        fetchData, handleSearch
    }

    return (
        <shopContext.Provider value={variable}>
            <div className={lightMode ? s.shop : `${s.shop} ${s.darkShop}`}>
                {searchDescription || selectedItem ? null : <Banner />}
                <Breadcrumb />
                <SearchBar />
                {searchDescription || selectedItem ? null : <ProductsNav />}
                {selectedItem != null && <ProductDetails />}
                <Products />
            </div>
        </shopContext.Provider>
    )
}

export default Shop