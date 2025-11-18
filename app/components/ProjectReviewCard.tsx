'use client';

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

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
    <div className="w-full max-w-5xl h-fit p-2 flex flex-col shadow-xl rounded-lg border border-gray-200 bg-white mb-10">
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

      <div className="flex flex-col w-full">
        {/* Architecture + Troubleshooting */}
        <div className="flex flex-col md:flex-row w-full">
          {/* Architecture */}
          <div className="w-full md:w-1/2 text-lg text-black p-2">
            <div className="mb-2 font-medium">※ Architecture</div>
            <div className="w-full max-h-[420px] md:max-h-[480px] overflow-auto rounded-md">
              {architecture}
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="w-full md:w-1/2 p-2 border-t md:border-t-0 md:border-l">
            <div className="text-lg text-black mb-2 font-medium">※ TroubleShooting</div>
            <div className="flex flex-col gap-5 max-h-[420px] md:max-h-[480px] overflow-auto">
              {troubles.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="text-sm text-red-600 whitespace-pre-line">• 문제 : {item.problem}</div>
                  <div className="text-sm text-green-600">• 해결 : {item.solution}</div>
                  <div className="text-sm text-black leading-relaxed break-keep whitespace-pre-line">• 결과 : {item.result}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review */}
        <div className="flex flex-col p-2 w-full h-full bg-white border-t">
          <div className="text-black text-lg font-medium">※ Project Review</div>
          <div className="flex flex-col w-full h-full gap-4 pt-2">
            <div className="text-black">
              <div className="text-base">• 아쉬운점</div>
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
