import s from "./CartTable.module.css";

function clampCount(val) {
  const n = Number(val);
  if (isNaN(n) || n < 1) return 1;
  if (n > 99) return 99;
  return n;
}

export default function CartTable({ items, tab, setCartItems, navigate }) {
  const tabItems = items.filter(i => i.status === tab);

  function toggleSelect(name, checked) {
    setCartItems(prev => prev.map(i => i.name === name ? { ...i, isSelected: checked } : i));
  }

  function setCount(name, val) {
    const count = clampCount(val);
    setCartItems(prev => {
      const updated = prev.map(i => i.name === name ? { ...i, count } : i);
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return updated;
    });
  }

  function cancelOrder(name) {
    setCartItems(prev => {
      const updated = prev.map(i =>
        i.name === name ? { ...i, status: "Cart", isSelected: false } : i
      );
      localStorage.setItem("cartItems", JSON.stringify(updated));
      return updated;
    });
  }

  if (tabItems.length === 0) {
    return (
      <div className={s.empty}>
        <div className={s.emptyBox}>
          <i className="fa fa-shopping-cart" />
          <h3>No items here</h3>
          <button onClick={() => navigate("/Shop")}>
            Shop Now <i className="fa fa-arrow-right" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={s.tableWrap}>
      <table className={s.table}>
        <tbody>
          {items.map((item, idx) => {
            if (item.status !== tab) return null;
            const slug = item.name.toLowerCase().split(" ").join("_");
            const imgSrc = `./products/${item.category}s/${item.image}`;

            return (
              <tr key={item.name} className={item.isSelected ? s.selected : ""}>
                <td className={s.imgCell} style={{ backgroundImage: `url(${imgSrc})` }}
                  onClick={() => navigate(`/Shop/Products/${slug}`)} />
                <td className={s.infoCell}>
                  <div className={s.topRow}>
                    <h4 onClick={() => navigate(`/Shop/Products/${slug}`)}>{item.name}</h4>
                    <input
                      type="checkbox"
                      checked={item.isSelected}
                      onChange={e => toggleSelect(item.name, e.target.checked)}
                    />
                  </div>
                  <div className={s.bottomRow}>
                    <span className={s.price}>₱ {item.price_php}</span>
                    <div className={s.qtyRow}>
                      {tab === "Cart" && (
                        <button className={s.qtyBtn} onClick={() => setCount(item.name, (item.count ?? 1) - 1)}>
                          <i className="fas fa-minus" />
                        </button>
                      )}
                      <input
                        type="number"
                        className={s.qtyInput}
                        value={item.count ?? 1}
                        readOnly={tab !== "Cart"}
                        onChange={e => tab === "Cart" && setCount(item.name, e.target.value)}
                      />
                      {tab === "Cart" && (
                        <button className={s.qtyBtn} onClick={() => setCount(item.name, (item.count ?? 1) + 1)}>
                          <i className="fas fa-plus" />
                        </button>
                      )}
                    </div>
                  </div>
                  {tab === "To Deliver" && (
                    <div className={s.deliveryRow}>
                      <span><i className="fas fa-truck" /> {item.dateDeliver}</span>
                      <button className={s.cancelBtn} onClick={() => cancelOrder(item.name)}>
                        Cancel Order
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
