import s from './MusicSection.module.css'
import AnimationContainer from '../../../../components/AnimationContainer/AnimationContainer'

function MusicSection() {


    return (
        <div className={`${s.musicSection}`}>
            <AnimationContainer>
                <div className={s.top}>
                    <i className='fas fa-music'></i>
                    <div className={s.title}>
                        <p>Favourite Song</p>
                        <h1>My Favourite Song</h1>
                    </div>
                </div>
            </AnimationContainer>
            <div className={s.wrapper}>
                <AnimationContainer>
                    <div className={s.left}>
                        <img src="./About/Album.png" />
                    </div>
                </AnimationContainer>
                <AnimationContainer delay={300}>
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
                </AnimationContainer>
            </div>
        </div>
    )
}

export default MusicSection