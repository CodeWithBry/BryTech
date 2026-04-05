import { useContext, useState } from 'react';
import { ShopContext } from '../Shop';
import s from './SearchBar.module.css';

export default function SearchBar() {
  const { handleSearch, searchDescription } = useContext(ShopContext);
  const [input, setInput] = useState(searchDescription || '');

  return (
    <div className={s.wrapper}>
      <div className={s.inputRow}>
        <i className={`fa fa-search ${s.icon}`} />
        <input
          type="text"
          className={s.input}
          placeholder="Search products, brands, categories…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch('Enter', input)}
        />
        {input && (
          <button className={s.clear} onClick={() => setInput('')} aria-label="Clear">
            <i className="fa fa-times" />
          </button>
        )}
      </div>
      <button className={s.btn} onClick={() => handleSearch(null, input)}>
        Search
      </button>
    </div>
  );
}
