"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ContactPopover from "./ContactPopover";

const PROJECTS = [
  { href: "/damo", label: "Damo" },
  { href: "/cookking", label: "Cookking" },
  { href: "/traffic", label: "Traffic" },
  { href: "/front-mission", label: "Front-mission" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="sticky w-full top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-50">
      <div className="w-full h-16 flex items-center justify-between text-black font-bold">
        <Link href={'/'}>
          Home
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              className={`rounded-md px-3 py-2 text-sm font-medium transition cursor-pointer
                ${menuOpen ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}
              `}
            >
              Menu
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-56 rounded-xl border bg-white shadow-lg backdrop-blur p-1"
              >
                {PROJECTS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-lg px-3 py-2 text-sm transition
                      ${isActive(item.href)
                        ? "text-blue-600 bg-black/[0.04]"
                        : "text-gray-700 hover:bg-black/[0.06] hover:text-gray-900"}
                    `}
                    role="menuitem"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <ContactPopover />
        </nav>
        <button
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border text-black"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle Menu"
        >
          ☰
        </button> 
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t">
          <div className="px-4 sm:px-6 lg:px-8 py-3 flex flex-col gap-2">
            <span className="text-xs font-semibold text-gray-500">Projects</span>
            {PROJECTS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm transition
                  ${isActive(item.href)
                    ? "text-blue-600 bg-black/[0.04]"
                    : "text-gray-700 hover:bg-black/[0.06] hover:text-gray-900"}
                `}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t mt-2">
              <ContactPopover />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
