import { useContext, useState } from 'react'
import { context } from '../../App'
import s from "./Search.module.css"
import { Link } from 'react-router-dom'

function Search(props) {
    const { search, setSearch, chatHistory } = props
    const { lightMode } = useContext(context)

    const [searching, setSearching] = useState(false)
    const [searchInput, setSearchInput] = useState("")
    const [result, setResult] = useState([])

    function handleSearch(e, input) {
        console.log(chatHistory)
        if (input?.length != 0 || (e == "Enter" && input == null)) {
            setSearching(prev => !prev)
            chatHistory.map((chat) => {
                const filterConvo = chat.convo.filter((convo) => convo.message?.toLowerCase().includes(input.toLowerCase()))
                const giveCidToConvos = filterConvo.map((convo) => {
                    return { ...convo, cid: chat.cid }
                })

                console.log(giveCidToConvos, filterConvo)
                setResult(prev => [...prev, ...giveCidToConvos])
            })
            setSearching(prev => !prev)
        }
    }



    if (search) return (
        <div className={lightMode ? s.search : `${s.search} ${s.darkSearch}`}>
            <div className={s.searchBox}>
                <h1><span>Search</span> <button onClick={() => setSearch(false)}><i className='fa fa-close'></i></button></h1>
                <div className={s.searchCon}>
                    <div className={s.searchInput}>
                        <i className={`fa fa-search ${s.searchIcon}`}></i>
                        <input type="text" placeholder='Search In Convos...' value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)} onKeyDown={(e) => {
                                if (e.key == "Enter") handleSearch(e.key, searchInput)
                                else setResult([])
                            }} />
                        <i className={`fa fa-close ${searchInput ? s.clear : s.hide}`} onClick={() => { setSearchInput("") }}></i>
                    </div>
                    <button onClick={() => handleSearch(null, searchInput)}>
                        Search
                    </button>
                </div>
            </div>
            <div className={s.searches}>
                {
                    result?.map((convo) => {
                        return <Link
                            key={convo.message}
                            to={`/BotBry/${convo?.cid}`}
                            className={s.link}
                            onClick={() => { setSearch(false), setSideBarCollapsed(true) }}>
                            {convo.message}
                        </Link>
                    })
                }
            </div>
        </div>
    )
}

export default Search