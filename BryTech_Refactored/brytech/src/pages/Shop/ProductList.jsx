import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useShop } from "./Shop";
import s from "./ProductList.module.css";

function SkeletonCard() {
  return <div className={s.skeleton}><div className={s.shimmer} /></div>;
}

function ProductCard({ item, category }) {
  const { addToCart, scrollUp } = useApp();
  const { setSelectedItem } = useShop();
  const navigate = useNavigate();

  const slug = item.name.toLowerCase().split(" ").join("_");
  const imgSrc = `./products/${category}/${item.image}`;

  function goToDetail() {
    navigate(`/Shop/Products/${slug}`);
    scrollUp();
    setSelectedItem(item);
  }

  return (
    <div className={s.card}>
      <div className={s.imgWrap} onClick={goToDetail}>
        <img src={imgSrc} alt={item.name} />
      </div>
      <div className={s.info}>
        <h3 onClick={goToDetail}>{item.name}</h3>
        <p className={s.brand}>{item.brand}</p>
        {item.gen && <p className={s.sub}>{item.gen}</p>}
      </div>
      <div className={s.footer}>
        <span className={s.price}>₱ {item.price_php}</span>
        <div className={s.actions}>
          <button className={s.detailsBtn} onClick={goToDetail}>
            Details
          </button>
          <button className={s.cartBtn} onClick={() => addToCart(item)}>
            <i className="fa fa-shopping-cart" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductList() {
  const { itemLists, selectedCategory, searchDescription, loading } = useShop();

  if (loading) {
    return (
      <div className={s.list}>
        <div className={s.grid}>
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  if (!itemLists) return null;

  return (
    <div className={s.list}>
      {itemLists.length > 1
        ? itemLists.map(group => (
          <div key={group.category}>
            <h2 className={s.groupTitle}>{group.category}</h2>
            <div className={s.grid}>
              {group.items?.map(item => (
                <ProductCard
                  key={item.name}
                  item={item}
                  category={group.category}
                />
              ))}
            </div>
          </div>
        ))
        : itemLists[0] && (
          <div>
            <div className={s.listHeader}>
              <h2 className={s.groupTitle}>
                {searchDescription
                  ? `Results for "${searchDescription}"`
                  : itemLists[0]?.category}
              </h2>
            </div>
            <div className={s.grid}>
              {itemLists[0]?.items?.map(item => (
                <ProductCard
                  key={item.name}
                  item={item}
                  category={selectedCategory?.name ?? item.category + "s"}
                />
              ))}
            </div>
          </div>
        )
      }
    </div>
  );
}
