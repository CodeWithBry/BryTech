"use client";
import { useEffect, useRef, useState } from "react";
import s from "./AnimationContainer.module.css"

export default function AnimationContainer({
  children,
  className = "",
  threshold = 0.2,
  triggerOnce = true,
  delay = 0
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`${s.container} ${isVisible ? s.showAnimationContainer : s.hideAnimationContainer}
        ${className}`}
    >
      {children}
    </div>
  );
}