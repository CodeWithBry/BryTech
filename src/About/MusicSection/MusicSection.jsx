import s from './MusicSection.module.css'
import a from '../About.module.css'

function MusicSection({ ref }) {


    return (
        <div className={`${s.musicSection}`} ref={ref}>
            <div className={s.top}>
                <i className='fas fa-music'></i>
                <div className={s.title}>
                    <p>Favourite Song</p>
                    <h1>My Favourite Song</h1>
                </div>
            </div>
            <div className={s.wrapper}>
                <div className={s.left}>
                    <img src="./About/Album.png" />
                </div>
                <div className={s.right}>
                    <div className={s.contents}>
                        <h1>Paraluman</h1>
                        <p className={s.shortDesc}>
                            “Paraluman” by Adie is a heartfelt OPM song that expresses deep admiration and love for someone special. The lyrics beautifully capture the feeling of being mesmerized by a person’s presence, comparing them to a muse or inspiration. Its soft melody and emotional delivery make it a favorite for listeners who appreciate songs about pure and sincere affection.
                        </p>
                        <audio controls>
                            <source src='./About/Paraluman.mp3' />
                        </audio>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MusicSection