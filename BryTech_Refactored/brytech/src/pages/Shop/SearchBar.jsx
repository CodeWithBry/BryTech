import { useState } from "react";
import { useShop } from "./Shop";
import s from "./SearchBar.module.css";

export default function SearchBar() {
  const { handleSearch, searchDescription } = useShop();
  const [input, setInput] = useState(searchDescription ?? "");

  return (
    <div className={s.searchBar}>
      <div className={s.wrapper}>
        <i className="fa fa-search" />
        <input
          type="text"
          placeholder="Search products… e.g. Intel Core i7"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => handleSearch(e.key, input)}
        />
        {input && (
          <button className={s.clear} onClick={() => setInput("")}>
            <i className="fa fa-times" />
          </button>
        )}
        <button className={s.searchBtn} onClick={() => handleSearch(null, input)}>
          Search
        </button>
      </div>
    </div>
  );
}
