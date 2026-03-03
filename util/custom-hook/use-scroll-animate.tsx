import { useCallback, useEffect, useRef } from "react";

const useScrollAnimate = (isLeft: boolean, translateValue: number) => {
  const dom = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback((entry: IntersectionObserverEntry, observer: IntersectionObserver) => {
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
        observer.unobserve(current);
      }
    }
  }, [isLeft, translateValue]);

  useEffect(() => {
    const { current } = dom;
    let observer: IntersectionObserver | undefined;
    if (current) {
      observer = new IntersectionObserver(
        (entries) => {
          handleScroll(entries[0], observer!);
        },
        {
          threshold: 0.5,
        }
      );
      observer.observe(current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [handleScroll]);

  return { ref: dom };
};

export default useScrollAnimate;
