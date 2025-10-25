import s from "./Shop.module.css"
import { context } from "../App"
import { createContext, useContext, useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import ProductsNav from "./ProductsNav/ProductsNav";
import Products from "./Products/Products";
import { useParams } from "react-router-dom";

export const shopContext = createContext()

function Shop() {
  const { defineTab, lightMode } = useContext(context);
  const { productCategory }  = useParams();
  const params = productCategory;

  const [skeletonLoading, setSkeletonLoading] = useState(false)

  const [selectedProduct, setSelectedProduct] = useState(null)

  const [productLists, setProductLists] = useState([
    { name: "All", endPoint: `/BryTech/products/All/all.json`, banner: "./Shop/sysunitBanner.jpg", isSelected: true },
    { name: "CPUs", endPoint: `/BryTech/products/CPUs/cpu.json`, banner: "./Shop/cpuBanner.jpg", isSelected: false },
    { name: "RAMs", endPoint: `/BryTech/products/RAMs/ram.json`, banner: "./Shop/ramBanner.jpg", isSelected: false },
    // { name: "GPU", endPoint: `/BryTech/products/Keyboards/cpu.json`, isSelected: false },
    // { name: "Motherboard", endPoint: `/BryTech/products//cpu.json`, isSelected: false },
    { name: "Keyboards", endPoint: `/BryTech/products/Keyboards/key.json`, banner: "./Shop/keyBanner.jpg", isSelected: false },
    // { name: "Mouse", endPoint: `/BryTech/products//cpu.json`, isSelected: false },
  ])
  const [itemLists, setItemLists] = useState(null)

  useEffect(() => {
    defineTab("/Shop")
  }, [])

  useEffect(() => {
    if (selectedProduct) {
      setSkeletonLoading(true)
      async function fetchProducts(product) {
        try {
          const getData = await fetch(product.endPoint)
          const data = await getData.json()

          product.name == "All" ? setItemLists([...data]) : setItemLists({ category: product.name, items: [...data] })

        } catch (error) {
          console.log(error)
        } finally {
          setSkeletonLoading(false)
        }
      }

      fetchProducts(selectedProduct);
    }
  }, [selectedProduct])

  useEffect(() => {
    if (params) {
      setProductLists(prev => prev.map((product) => {
        if (product.name.toLowerCase() == params.toLowerCase()) {
          const newProduct = product
          newProduct.isSelected = true
          setSelectedProduct(newProduct)
          return { ...product, isSelected: true }
        }

        return { ...product, isSelected: false }
      }))
    } else {
      setProductLists(prev => prev.map((product) => {
        if (product.name.toLowerCase() == "all") {
          const newProduct = product
          newProduct.isSelected = true
          setSelectedProduct(newProduct)
          return { ...product, isSelected: true }
        }

        return { ...product, isSelected: false }
      }))
    }
  }, [params])

  const variable = {
    //boolean
    skeletonLoading, setSkeletonLoading,
    // strings
    // numbers
    // arrays & objects
    productLists, setProductLists,
    itemLists, setItemLists,
    selectedProduct, setSelectedProduct,
    // functions
  }

  return (
    <shopContext.Provider value={variable}>
      <div className={lightMode ? s.shop : `${s.shop} ${s.darkShop}`}>
        <Banner />
        <ProductsNav />
        <Products />
      </div>
    </shopContext.Provider>
  )
}

export default Shop