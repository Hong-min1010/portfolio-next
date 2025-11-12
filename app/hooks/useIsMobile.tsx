import { useState, useEffect } from "react";

const XS_BREAKPOINT = 360;
const SM_BREAKPOINT = 768;
const MD_BREAKPOINT = 1000;
const LG_BREAKPOINT = 1280;

interface UseIsMobileReturn {
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isMobile: boolean;
  isTablet: boolean;
}

export default function useIsMobile(): UseIsMobileReturn {
  const [isXs, setIsXs] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth <= XS_BREAKPOINT : false
  );
  const [isSm, setIsSm] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth <= SM_BREAKPOINT : false
  );
  const [isMd, setIsMd] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth <= MD_BREAKPOINT : false
  );
  const [isLg, setIsLg] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth <= LG_BREAKPOINT : false
  );
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth <= MD_BREAKPOINT : false
  );
  const [isTablet, setIsTablet] = useState<boolean>(
    typeof window !== "undefined"
      ? window.innerWidth > MD_BREAKPOINT && window.innerWidth <= LG_BREAKPOINT
      : false
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsXs(width <= XS_BREAKPOINT);
      setIsSm(width <= SM_BREAKPOINT);
      setIsMd(width <= MD_BREAKPOINT);
      setIsLg(width <= LG_BREAKPOINT);
      setIsMobile(width <= MD_BREAKPOINT);
      setIsTablet(width > MD_BREAKPOINT && width <= LG_BREAKPOINT);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isXs, isSm, isMd, isLg, isMobile, isTablet };
}
