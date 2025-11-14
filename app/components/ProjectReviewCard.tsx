'use client';

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ---------- types ---------- */
type TroubleItem = {
  problem: ReactNode;
  solution: ReactNode;
  result: ReactNode;
};

type LinkItem = {
  label: string;
  href: string;
  newTab?: boolean;
  icon?: ReactNode;
};

type ProjectReviewCardProps = {
  title: string;
  architecture: ReactNode;
  troubles: TroubleItem[];
  drawbacks: ReactNode;
  improvements: ReactNode;
  links?: LinkItem[];
};

export default function ProjectReviewCard({
  title,
  architecture,
  troubles,
  drawbacks,
  improvements,
  links = [],
}: ProjectReviewCardProps) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const popRef = useRef<HTMLDivElement | null>(null);

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
    <div className="w-full max-w-5xl h-fit p-2 flex flex-col shadow-xl rounded-lg overflow-hidden border border-gray-200 bg-white">
      <div className="w-full p-3 border-b bg-white flex items-center justify-between">
        <span className="text-blue-600 text-xl font-bold px-2">{title}</span>
        <div className="relative">
          <button
            ref={btnRef}
            type="button"
            onClick={() => setOpen(v => !v)}
            aria-haspopup="dialog"
            aria-expanded={open}
            className="px-3 py-1.5 rounded-md text-sm font-medium bg-blue-300 hover:bg-blue-500/80 
              focus:outline-none focus-visible:ring-2 text-black focus-visible:ring-black/30 cursor-pointer"
          >
            Links
          </button>

          {open && (
            <div
              ref={popRef}
              role="dialog"
              aria-label="Project links"
              className="absolute right-0 mt-2 w-64 rounded-2xl border bg-white/95 shadow-lg ring-1 ring-black/5 backdrop-blur p-2 z-20"
            >
              <span className="pointer-events-none absolute -top-1 right-6 h-2 w-2 rotate-45 bg-white border-l border-t ring-1 ring-black/5" />

              <ul className="py-1">
                {links.length > 0 ? (
                  links.map((item, i) => {
                    const target = item.newTab === false ? "_self" : "_blank";
                    return (
                      <li key={i}>
                        <Link
                          href={item.href}
                          target={target}
                          rel={target === "_blank" ? "noreferrer" : undefined}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-700 
                          hover:bg-black/5 hover:text-gray-900 transition"
                          onClick={() => setOpen(false)}
                        >
                          <span className="material-symbols-outlined text-sm"
                          style={{fontSize: "18px"}}>open_in_new</span>
                          <span className="truncate">{item.label}</span>
                          <span className="material-symbols-outlined ml-auto opacity-60"
                            style={{ fontSize: "12px", lineHeight: "1" }}>south_east</span>
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <li className="px-3 py-2 text-sm text-gray-500">
                    등록된 링크가 없습니다.
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col w-full h-full">
        {/* Architecture + Troubleshooting */}
        <div className="flex w-full h-full">
          {/* Architecture */}
          <div className="w-1/2 h-full text-lg text-black border-r p-2">
            <div className="mb-2 font-medium">※ Architecture</div>
            <div className="w-full h-full overflow-auto">{architecture}</div>
          </div>

          {/* Troubleshooting */}
          <div className="w-1/2 h-full p-2">
            <div className="text-lg text-black mb-2 font-medium">※ TroubleShooting</div>
            <div className="flex flex-col gap-5 overflow-auto">
              {troubles.map((item, idx) => (
                <div key={idx} className="pt-2 flex flex-col gap-3">
                  <div className="text-base text-red-600">• 문제 : {item.problem}</div>
                  <div className="text-base text-green-600">• 해결 : {item.solution}</div>
                  <div className="text-base text-black">• 결과 : {item.result}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review */}
        <div className="flex flex-col p-2 w-full h-full bg-white border-t">
          <div className="text-black text-lg font-medium">※ Project Review</div>
          <div className="flex flex-col w-full h-full gap-4 pt-2">
            <div className="text-black text-base">
              • 아쉬운점
              <div className="mt-1 text-sm whitespace-pre-line">{drawbacks}</div>
            </div>
            <div className="text-black text-base">
              • 개선점
              <div className="mt-1 text-sm whitespace-pre-line">{improvements}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 opacity-70" fill="currentColor">
      <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
      <path d="M5 5h6v2H7v10h10v-4h2v6H5V5z" />
    </svg>
  );
}
function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
      <path d="M7.22 6.47a.75.75 0 011.06 0L13 11.19V7.75a.75.75 0 011.5 0v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 010-1.5h3.44L7.22 7.53a.75.75 0 010-1.06z" />
    </svg>
  );
}
