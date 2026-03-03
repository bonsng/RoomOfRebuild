import { useState, useEffect } from "react";

const useInnerWidth = () => {
  const [innerWidthVal, setInnerWidthVal] = useState<number>(() =>
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    const handleResize = () => {
      setInnerWidthVal(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return innerWidthVal;
};

export default useInnerWidth;
