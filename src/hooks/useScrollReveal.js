import { useEffect } from 'react';

export function useScrollReveal(wrapperRef, sectionClass, revealClass) {
  useEffect(() => {
    const wrapper = wrapperRef?.current;
    if (!wrapper) return;

    function onScroll() {
      const sections = wrapper.querySelectorAll(`.${sectionClass}`);
      sections.forEach(el => {
        if (wrapper.scrollTop + 400 > el.offsetTop) {
          el.classList.add(revealClass);
        } else if (wrapper.scrollTop - 800 < el.offsetTop) {
          el.classList.remove(revealClass);
        }
      });
    }

    onScroll();
    wrapper.addEventListener('scroll', onScroll);
    return () => wrapper.removeEventListener('scroll', onScroll);
  }, [wrapperRef, sectionClass, revealClass]);
}
