import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import Banner from "./Banner";
import ProductsNav from "./ProductsNav";
import SearchBar from "./SearchBar";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import Breadcrumb from "./Breadcrumb";
import s from "./Shop.module.css";

export const ShopContext = createContext();
export const useShop = () => useContext(ShopContext);

const CATEGORIES = [
  { name: "All", endpoint: "/BryTech/products/All/all.json", banner: "./Shop/sysunitBanner.jpg", isSelected: true },
  { name: "CPUs", endpoint: "/BryTech/products/CPUs/cpu.json", banner: "./Shop/cpuBanner.jpg", isSelected: false },
  { name: "RAMs", endpoint: "/BryTech/products/RAMs/ram.json", banner: "./Shop/ramBanner.jpg", isSelected: false },
  { name: "Keyboards", endpoint: "/BryTech/products/Keyboards/key.json", banner: "./Shop/keyBanner.jpg", isSelected: false },
];

async function fetchAll() {
  const res = await fetch("/BryTech/products/All/all.json");
  return res.json();
}

export default function Shop() {
  const { defineTab } = useApp();
  const navigate = useNavigate();
  const { productCategory, searchDescription, productName } = useParams();

  const [categories, setCategories] = useState(CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [itemLists, setItemLists] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { defineTab("/Shop"); }, []);

  async function loadCategory(cat) {
    setLoading(true);
    try {
      const res = await fetch(cat.endpoint);
      const data = await res.json();
      setItemLists(data);
    } catch { setItemLists(null); }
    finally { setLoading(false); }
  }

  async function handleSearch(key, input) {
    if (key !== "Enter" && key !== null) return;
    if (!input?.trim()) { navigate("/Shop"); return; }
    setSelectedItem(null);
    navigate(`/Shop/Search/${input}`);
    setLoading(true);
    try {
      const all = await fetchAll();
      const matched = [];
      Object.values(all).forEach(group => {
        group.items?.forEach(item => {
          const words = input.split(" ");
          const hit = words.some(w =>
            item.name.toLowerCase().includes(w.toLowerCase()) ||
            item.category?.toLowerCase().includes(w.toLowerCase()) ||
            item.brand?.toLowerCase().includes(w.toLowerCase())
          );
          if (hit) matched.push(item);
        });
      });
      setItemLists([{ category: searchDescription ?? input, items: matched }]);
    } catch {}
    finally { setLoading(false); }
  }

  async function handleFindProduct(name) {
    if (!name) { setSelectedItem(null); return; }
    navigate(`/Shop/Products/${name}`);
    try {
      const all = await fetchAll();
      let found = null;
      Object.values(all).forEach(group => {
        group.items?.forEach(item => {
          if (item.name.toLowerCase().split(" ").join("_") === name.toLowerCase()) {
            found = item;
          }
        });
      });
      setSelectedItem(found);
    } catch {}
  }

  useEffect(() => {
    if (productCategory && !searchDescription) {
      setSelectedItem(null);
      setCategories(prev => prev.map(c => {
        const match = c.name.toLowerCase() === productCategory.toLowerCase();
        if (match) { setSelectedCategory(c); loadCategory(c); }
        return { ...c, isSelected: match };
      }));
    } else if (!productCategory && !searchDescription) {
      const all = CATEGORIES[0];
      setCategories(prev => prev.map(c => ({ ...c, isSelected: c.name === "All" })));
      setSelectedCategory(all);
      loadCategory(all);
    }
  }, [productCategory, searchDescription]);

  useEffect(() => {
    if (!productCategory) {
      if (productName && !searchDescription) {
        handleFindProduct(productName);
      } else if (!productName && searchDescription) {
        setSelectedItem(null);
        handleSearch(null, searchDescription);
      } else if (!productName && !searchDescription) {
        setSelectedItem(null);
      }
    }
  }, [productName, searchDescription, productCategory]);

  const ctx = {
    categories, setCategories,
    selectedCategory, setSelectedCategory,
    itemLists, setItemLists,
    selectedItem, setSelectedItem,
    loading,
    searchDescription, productName, productCategory,
    handleSearch, loadCategory,
  };

  return (
    <ShopContext.Provider value={ctx}>
      <div className={s.shop}>
        {!searchDescription && !selectedItem && <Banner />}
        <Breadcrumb />
        <SearchBar />
        {!searchDescription && !selectedItem && <ProductsNav />}
        {selectedItem && <ProductDetails />}
        <ProductList />
      </div>
    </ShopContext.Provider>
  );
}
