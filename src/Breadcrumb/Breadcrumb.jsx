import s from './Breadcrumb.module.css'
import { context } from '../App'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Breadcrumb() {
    const { path } = useContext(context)
    const navigation = useNavigate()
    const [pathParts, setPathParts] = useState()


    useEffect(() => {
        if (path) {
            setPathParts(path.split("/"))
        }
    }, [path])

    if(pathParts?.length != 1) return (
        <div className={s.breadCrumb}>
            {
                pathParts?.map((str, index) => {
                    if (str != "") return <span>
                        /
                        <Link
                            className={s.links}
                            to={index != pathParts.length - 1 
                                ? path.slice(0, path.indexOf(`/${pathParts[index+1]}`)).includes("Search") 
                                    ? "/Shop" : path.slice(0, path.indexOf(`/${pathParts[index+1]}`)) 
                                : null}>
                            {str}
                        </Link>
                    </span>
                })
            }
        </div>
    )
}

export default Breadcrumb