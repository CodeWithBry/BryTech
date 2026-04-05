import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Banner from './components/Banner';
import Breadcrumb from './components/Breadcrumb';
import CategoryNav from './components/CategoryNav';
import SearchBar from './components/SearchBar';
import ProductGrid from './components/ProductGrid';
import ProductDetails from './components/ProductDetails';
import s from './Shop.module.css';

export const ShopContext = createContext();

const CATEGORIES = [
  { name: 'All', endpoint: '/BryTech/products/All/all.json', banner: './Shop/sysunitBanner.jpg' },
  { name: 'CPUs', endpoint: '/BryTech/products/CPUs/cpu.json', banner: './Shop/cpuBanner.jpg' },
  { name: 'RAMs', endpoint: '/BryTech/products/RAMs/ram.json', banner: './Shop/ramBanner.jpg' },
  { name: 'Keyboards', endpoint: '/BryTech/products/Keyboards/key.json', banner: './Shop/keyBanner.jpg' },
];

export default function Shop() {
  const { defineTab } = useContext(AppContext);
  const { productCategory, productName, searchDescription } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState(CATEGORIES.map((c, i) => ({ ...c, isSelected: i === 0 })));
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [itemLists, setItemLists] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchAll() {
    try {
      const res = await fetch('/BryTech/products/All/all.json');
      return res.json();
    } catch {
      return null;
    }
  }

  async function loadCategory(cat) {
    setLoading(true);
    try {
      const res = await fetch(cat.endpoint);
      const data = await res.json();
      setItemLists(data);
    } catch {
      setItemLists([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(key, input) {
    if (key !== 'Enter' && key !== null) return;
    if (!input?.trim()) {
      navigate('/Shop');
      return;
    }
    setSelectedItem(null);
    navigate(`/Shop/Search/${input.trim()}`);
    setLoading(true);
    const all = await fetchAll();
    if (!all) { setLoading(false); return; }
    const results = [];
    Object.values(all).forEach(section => {
      section.items?.forEach(item => {
        const words = input.toLowerCase().split(' ');
        const match = words.some(w =>
          item.name.toLowerCase().includes(w) ||
          item.category?.toLowerCase().includes(w) ||
          item.brand?.toLowerCase().includes(w)
        );
        if (match) results.push(item);
      });
    });
    setItemLists([{ category: input, items: results }]);
    setLoading(false);
  }

  async function findProduct(name) {
    if (!name) { setSelectedItem(null); return; }
    const all = await fetchAll();
    if (!all) return;
    Object.values(all).forEach(section => {
      section.items?.forEach(item => {
        if (item.name.toLowerCase().split(' ').join('_') === name.toLowerCase()) {
          setSelectedItem(item);
        }
      });
    });
  }

  function selectCategory(cat) {
    setCategories(prev => prev.map(c => ({ ...c, isSelected: c.name === cat.name })));
    setSelectedCategory(cat);
  }

  useEffect(() => { defineTab('/Shop'); }, []);

  useEffect(() => {
    if (!productCategory && !productName && !searchDescription) {
      selectCategory(CATEGORIES[0]);
      return;
    }
    if (productCategory) {
      const found = CATEGORIES.find(c => c.name.toLowerCase() === productCategory.toLowerCase());
      if (found) selectCategory(found);
    }
  }, [productCategory]);

  useEffect(() => {
    if (selectedCategory) loadCategory(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (productName) {
      setTimeout(() => findProduct(productName), 300);
    } else {
      setSelectedItem(null);
    }
  }, [productName]);

  useEffect(() => {
    if (searchDescription) handleSearch(null, searchDescription);
  }, [searchDescription]);

  const ctx = {
    categories, selectedCategory, selectCategory,
    itemLists, selectedItem, setSelectedItem,
    loading, handleSearch, searchDescription, productName,
  };

  return (
    <ShopContext.Provider value={ctx}>
      <div className={s.shop}>
        {!searchDescription && !selectedItem && <Banner />}
        <Breadcrumb />
        <SearchBar />
        {!searchDescription && !selectedItem && <CategoryNav />}
        {selectedItem && <ProductDetails />}
        <ProductGrid />
      </div>
    </ShopContext.Provider>
  );
}
