import { useEffect, useRef } from 'react'
import s from './Contents.module.css'

function Contents(props) {
  const sectionRef = useRef()

  useEffect(() => {
    if (props?.links && sectionRef.current) {
      const getSection = () => {
        props.setDocsLoading(true)

        const newElements = []

        props.links.forEach((mainLink) => {
          if (mainLink?.isSelected) {
            mainLink.subLinks.forEach((link) => {
              const section = document.getElementById(link.link)
              if (section) newElements.push(section)
            })
          }
        })

        props.setSections(newElements)
        props.setDocsLoading(false)
      }

      // Run AFTER render (and ensure DOM updated)
      const timeout = setTimeout(getSection, 0)

      // cleanup
      return () => clearTimeout(timeout)
    }
  }, [props.links, props.subLink])

  return (
    <div className={`${s.contents} ${s.contentsWrapper}`} id={s.contentsWrapper}>
      <div className={s.wrapper} >
        {props?.links.map((mainLink) => {
          if (mainLink.relativeURL == props?.subLink) return mainLink.subLinks.map(link => {
            return <div className={s.section} id={link.link} ref={sectionRef}>
              {
                link.contents.map((con) => {
                  return <>
                    {con?.h3 && <h3>{con?.h3}</h3>}
                    {con?.h4 && <h4>{con?.h4}</h4>}
                    {con?.p && <p>{con?.p}</p>}
                    {con?.li && <ul>
                      {con?.li.map((li) => <li key={li}>{li}</li>)}
                    </ul>}
                    {con?.img && <div className={s.imageWrapper}>
                      {con?.img.map((img) => <img src={img} />)}
                    </div>}
                  </>
                })
              }
              <hr />
            </div>
          })
        })}
      </div>
    </div>
  )
}

export default Contents