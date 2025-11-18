import { useEffect, useState } from "react";

const SM = 768;
const LG = 1440;

interface UseIsMobileReturn {
  width: number;
  height: number;
  isMobile: boolean;      // < 768
  isTablet: boolean;      // 768 ~ 1439
  isDesktop: boolean;     // >= 1440
}

export default function useIsMobile(): UseIsMobileReturn {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = size.width < SM;
  const isTablet = size.width >= SM && size.width < LG;
  const isDesktop = size.width >= LG;

  return {
    width: size.width,
    height: size.height,
    isMobile,
    isTablet,
    isDesktop,
  };
}