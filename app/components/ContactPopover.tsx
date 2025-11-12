"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = {
  github?: string;
  email?: string;
  phone?: string;
  label?: string;
};

export default function ContactPopover({
  github = "https://github.com/Hong-min1010",
  email = "qza7367@gmail.com",
  phone = "010-7367-0233",
  label = "Contact",
}: Props) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const popRef = useRef<HTMLDivElement | null>(null);

  // 바깥 클릭/ESC 닫기
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (popRef.current?.contains(t) || btnRef.current?.contains(t)) return;
      setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-500/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 bg-blue-300 cursor-pointer"
      >
        {label}
      </button>

      {open && (
        <div
          ref={popRef}
          role="dialog"
          aria-label="Contact info"
          className="absolute right-0 mt-2 w-64 rounded-2xl border bg-white/95 shadow-lg ring-1 ring-black/5 backdrop-blur p-3"
        >
          {/* 말풍선 꼬리 */}
          <span className="pointer-events-none absolute -top-1 right-6 h-2 w-2 rotate-45 bg-white border-l border-t ring-1 ring-black/5" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <span className="shrink-0">🐙</span>
                <Link
                  href={github}
                  className="truncate text-blue-600 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {github.replace(/^https?:\/\//, "")}
                </Link>
              </div>
              {/* 닫기 */}
              <div className="text-right">
                <button
                  onClick={() => setOpen(false)}
                  className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="shrink-0">✉️</span>
              {email}
            </div>

            <div className="flex items-center gap-2">
              <span className="shrink-0">📞</span>
              {phone}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
