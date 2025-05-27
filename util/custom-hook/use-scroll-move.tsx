import { useCallback, useEffect, useRef } from "react";

const thresholds: number[] = new Array();
for (let i = 0; i < 1.0; i += 0.0001) {
  thresholds.push(i);
}

const useScrollMove = () => {
  const clampNumber = useCallback(
    (num: number) => Math.min(Math.max(1.25 * num - 0.25, 0), 1),
    []
  );

  const dom = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback((entries: IntersectionObserverEntry[]) => {
    const { current } = dom;

    if (!current) return;

    const text1 = document.querySelector<HTMLDivElement>("section div")
      ?.children[0] as HTMLElement;
    const text2 = document.querySelector<HTMLDivElement>("section div")
      ?.children[1] as HTMLElement;
    const line = document.querySelector<HTMLDivElement>("section div")
      ?.children[2] as HTMLElement;

    entries.forEach((entry) => {
      if (!text1 || !line) return;

      const ratio = entry.intersectionRatio;
      const visiblePct = clampNumber(Math.floor(ratio * 10000) / 3300);

      text1.style.transform = `translate3D(${
        -(1 - visiblePct) * 8.0
      }vw, 0, 0)`;
      text2.style.transform = `translate3D(${-(1 - visiblePct) * 7.5}vw, 0, 0)`;
      line.style.width = `${(1 - visiblePct) * 30}%`;
      line.style.transform = `translate3D(${-(1 - visiblePct) * 7.5}vw, 0, 0)`;
    });
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const { current } = dom;

    if (current) {
      observer = new IntersectionObserver(handleScroll, {
        threshold: thresholds,
      });
      observer.observe(current);
    }

    return () => {
      if (observer) observer.disconnect;
    };
  }, [handleScroll]);

  return { ref: dom };
};

export default useScrollMove;
