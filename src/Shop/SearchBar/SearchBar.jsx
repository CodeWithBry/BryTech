import { useContext, useEffect, useState } from 'react'
import s from './SearchBar.module.css'
import { shopContext } from "../Shop"
import { useNavigate } from 'react-router-dom'

function SearchBar() {
    const { lightMode, handleSearch, searchDescription } = useContext(shopContext)

    const [searchInput, setSearchInput] = useState(searchDescription || "")

    return (
        <div className={lightMode ? s.searchBar : `${s.searchBar} ${s.darkSearchBar}`}>
            <h1>Search</h1>
            <div className={s.searchWrapper}>
                
                <div className={s.searchInput}>
                    <i className={`fa fa-search ${s.searchIcon}`}></i>
                    <input type="text" placeholder='Intel Core i7-14700K' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyDown={(e) => handleSearch(e.key, searchInput)} />
                    <i className={`fa fa-close ${searchInput ? s.clear : s.hide}`} onClick={()=>{setSearchInput("")}}></i>
                </div>
                <button onClick={() => handleSearch(null, searchInput)}>
                    Search
                </button>
            </div>
        </div>
    )
}

export default SearchBar