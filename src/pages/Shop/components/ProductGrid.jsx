import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../Shop';
import ProductCard from './ProductCard';
import SkeletonCard from './SkeletonCard';
import s from './ProductGrid.module.css';

const SKELETON_COUNT = 8;

export default function ProductGrid() {
  const { itemLists, loading, selectedCategory, searchDescription, productName } = useContext(ShopContext);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className={s.grid}>
        <div className={s.row}>
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!itemLists) return null;

  return (
    <div className={s.grid}>
      {itemLists.map((section, i) => (
        <div key={i} className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.title}>
              {searchDescription ? `Results for "${searchDescription}"` : section.category}
            </h2>
            {(productName || searchDescription) && (
              <button
                className={s.backBtn}
                onClick={() => navigate(`/Shop/${selectedCategory?.name || ''}`)}
              >
                <i className="fa fa-arrow-left" /> Back
              </button>
            )}
          </div>
          {section.items?.length === 0 ? (
            <div className={s.empty}>
              <i className="fa fa-search" />
              <p>No products found.</p>
            </div>
          ) : (
            <div className={s.row}>
              {section.items?.map(item => (
                <ProductCard
                  key={item.name}
                  item={item}
                  category={searchDescription ? (item.category + 's') : (selectedCategory?.name || (item.category + 's'))}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
