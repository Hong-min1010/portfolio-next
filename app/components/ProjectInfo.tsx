"use client";

import Link from "next/link";

export type Project = {
  id: string;
  title: string;
  href?: string;
};

type Props = {
  data: Project;
  active?: boolean;     // 스타일 강조(테두리/그림자/CTA 애니메이션)
  showMeta?: boolean;   // ✅ 제목/요약/버튼 노출 여부
  className?: string;
};

export default function ProjectInfo({ data, active = false, showMeta = true, className = "" }: Props) {
  const { title, href } = data;

  return (
    <div
      className={[
        "relative w-[320px] h-[420px] rounded-3xl border bg-white shadow-xl",
        "transition-all duration-300 will-change-transform will-change-opacity",
        className,
      ].join(" ")}
      style={{
        boxShadow: active
          ? "0 36px 72px rgba(0,0,0,0.22)"
          : "0 16px 32px rgba(0,0,0,0.12)",
      }}
    >
      {/* 상단 바 */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-neutral-200 flex items-center justify-center text-[10px] text-neutral-600">
            PJ<br/>IMG
          </div>
          {/* ✅ 제목은 중앙 카드에서만 보임 */}
          {showMeta && (
            <div className="text-sm font-medium text-neutral-800 truncate">
              {title}
            </div>
          )}
        </div>
      </div>

      {/* 본문 영역(프레임은 유지) */}
      <div className="px-4">
        <div className="h-[290px] rounded-xl bg-neutral-100 border flex items-center justify-center text-neutral-500 text-sm">
          Introduce Project
        </div>
      </div>

      {/* ✅ 버튼도 중앙 카드에서만 */}
      {showMeta && (
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="flex justify-end">
            <Link
              href={href || "#"}
              className={[
                "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm",
                "bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400",
                active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
                "transition-all duration-300",
              ].join(" ")}
              onClick={(e) => {
                if (!href) e.preventDefault();
              }}
            >
              View
            </Link>
          </div>
        </div>
      )}

      {/* 테두리 강조 */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-[box-shadow] duration-300"
        style={{
          boxShadow: active
            ? "inset 0 0 0 2px rgba(0,0,0,0.85)"
            : "inset 0 0 0 1px rgba(0,0,0,0.55)",
        }}
      />
    </div>
  );
}
