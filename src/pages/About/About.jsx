import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import Expertise from './components/Expertise/Expertise';
import TechStack from './components/TechStack/TechStack';
import MusicSection from './components/MusicSection/MusicSection';
import s from './About.module.css';
import HeroSection from './components/Hero/Hero';

export default function About() {
  const { defineTab, wrapperRef } = useContext(AppContext);

  useEffect(() => { defineTab('/About'); }, []);

  return (
    <main className={s.about}>
      <HeroSection />
      <Expertise />
      <TechStack />
      <MusicSection />
    </main>
  );
}
