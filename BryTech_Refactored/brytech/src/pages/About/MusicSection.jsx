import React from "react";
import s from "./MusicSection.module.css";

const MusicSection = React.forwardRef(function MusicSection(_, ref) {
  return (
    <section className={s.music} ref={ref}>
      <div className={s.heading}>
        <span className={s.tag}>Favourite Song</span>
        <h2>What I'm Listening To</h2>
      </div>
      <div className={s.card}>
        <div className={s.albumArt}>
          <img src="./About/Album.png" alt="Paraluman album art" />
        </div>
        <div className={s.details}>
          <h3>Paraluman</h3>
          <p className={s.artist}>Adie</p>
          <p className={s.desc}>
            A heartfelt OPM song expressing deep admiration and love. Its soft melody and
            emotional delivery make it a favourite for listeners who appreciate sincere affection.
          </p>
          <audio controls className={s.player}>
            <source src="./About/Paraluman.mp3" />
          </audio>
        </div>
      </div>
    </section>
  );
});

export default MusicSection;
