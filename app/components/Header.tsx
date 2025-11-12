"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ContactPopover from "./ContactPopover";

const NAV = [
  { href: "/cookking", label: "Cookking" },
  { href: "/damo", label: "Damo" },
  { href: "/traffic", label: "Traffic" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between text-black">
        <Link href={'/'}>
          Portfolio
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition hover:text-blue-600 ${
                isActive(item.href) ? "text-blue-600 font-medium" : "text-gray-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
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

      {open && (
        <nav className="md:hidden border-t">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3 flex flex-col gap-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`py-1.5 ${
                  isActive(item.href) ? "text-blue-600 font-medium" : "text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-xl bg-blue-600 px-3 py-2 text-sm text-white text-center"
            >
              Contact
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
