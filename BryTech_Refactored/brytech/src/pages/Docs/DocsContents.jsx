import s from "./DocsContents.module.css";

export default function DocsContents({ links, subLink }) {
  const active = links.find(l => l.slug === subLink);

  return (
    <div className={s.contents}>
      <div className={s.wrapper}>
        {active?.sections.map(sec => (
          <section key={sec.id} id={sec.id} className={s.section}>
            {sec.content.map((block, i) => (
              <div key={i} className={s.block}>
                {block.h3 && <h3>{block.h3}</h3>}
                {block.h4 && <h4>{block.h4}</h4>}
                {block.p && <p>{block.p}</p>}
                {block.li && (
                  <ul className={s.list}>
                    {block.li.map(item => <li key={item}>{item}</li>)}
                  </ul>
                )}
                {block.img && (
                  <div className={s.images}>
                    {block.img.map(src => (
                      <img key={src} src={src} alt="" loading="lazy" />
                    ))}
                  </div>
                )}
              </div>
            ))}
            <hr className={s.divider} />
          </section>
        ))}
        {!active && (
          <div className={s.empty}>
            <i className="fa fa-book" />
            <p>Select a section from the sidebar.</p>
          </div>
        )}
      </div>
    </div>
  );
}
