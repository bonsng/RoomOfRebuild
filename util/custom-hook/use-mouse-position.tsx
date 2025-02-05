import { useCallback, useEffect, useState } from "react";

interface MousePosition {
  ratio: number | null;
}

const useMousePosition = (): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    ratio: null,
  });

  const updateMousePosition = useCallback((ev: MouseEvent) => {
    setMousePosition({ ratio: ev.clientX / window.innerWidth });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [updateMousePosition]);

  return mousePosition;
};

export default useMousePosition;
