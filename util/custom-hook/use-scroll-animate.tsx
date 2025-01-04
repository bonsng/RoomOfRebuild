import { useCallback, useEffect, useRef } from "react";

const useScrollAnimate = (isLeft: boolean, translateValue: number) => {
  const dom = useRef<HTMLDivElement | null>(null);
  let observer: IntersectionObserver | undefined;

  useEffect(() => {
    const { current } = dom;
    if (current) {
      observer = new IntersectionObserver(
        (entries) => {
          handleScroll(entries[0]);
        },
        {
          threshold: 0.5,
        }
      );
      observer.observe(current);
    }

    return () => {
      if (observer) observer.disconnect;
    };
  }, []);

  const handleScroll = (entry: IntersectionObserverEntry) => {
    const { current } = dom;
    const text = current?.firstChild as HTMLDivElement;
    const image = current?.lastChild as HTMLDivElement;
    if (current) {
      if (entry.isIntersecting) {
        image.style.transform = `translateX(${
          isLeft ? "" : "-"
        }${translateValue}vw)`;
        image.style.opacity = "1";
        text.style.opacity = "1";
        console.log(image.className);
        observer?.unobserve(current);
      }
    }
  };

  return { ref: dom };
};

export default useScrollAnimate;
