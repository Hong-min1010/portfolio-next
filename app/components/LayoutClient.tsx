"use client";

import type { ReactNode } from "react";
import useIsMobile from "../hooks/useIsMobile";

interface Props {
  children: ReactNode;
}

export default function LayoutClient({ children }: Props) {
  const { isMobile, isTablet, isDesktop } = useIsMobile();

  const paddingX = isMobile
    ? "px-4"
    : isTablet
    ? "px-6"
    : "px-12";

  return (
    <div className={`w-full flex justify-center pt-6 md:pt-8 lg:pt-10 ${paddingX}`}>
      <div className="w-full max-w-[1440px]">
        {children}
      </div>
    </div>
  );
}
