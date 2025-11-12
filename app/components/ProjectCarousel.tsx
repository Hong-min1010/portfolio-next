"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import ProjectInfo, { Project } from "./ProjectInfo";

type Props = {
  projects: Project[];
  intervalMs?: number;
  spread?: number;
  offsetX?: number;
  offsetY?: number;
  /** 스택 중앙(50%)에서 아래로 내리는 거리(px) — 카드 바로 밑에 붙이려면 210~235 사이 추천 */
  buttonsOffsetY?: number;
  /** 좌/우 화살표 사이 간격(px) */
  buttonsGap?: number;
};

export default function ProjectCarousel({
  projects,
  intervalMs = 1500,
  spread = 140,
  offsetX = 260,
  offsetY = 120,
  buttonsOffsetY = 50, // ← 사진처럼 가깝게
  buttonsGap = 120,      // ← 버튼 간격
}: Props) {
  const n = projects.length;
  const [active, setActive] = useState(0);

  // --- autoplay (리셋/재개 보장)
  const pausedRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const clearTimer = () => { if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; } };
  const startTimer = () => {
    if (pausedRef.current || n <= 1) return;
    clearTimer();
    timerRef.current = window.setTimeout(() => {
      setActive(a => (a + 1) % n);
      startTimer();
    }, intervalMs);
  };
  useEffect(() => { startTimer(); return clearTimer; }, [intervalMs, n]);

  const goPrev = () => { setActive(a => (a - 1 + n) % n); startTimer(); };
  const goNext = () => { setActive(a => (a + 1) % n); startTimer(); };

  // --- layout: 부채꼴 + depth
  const mid = (n - 1) / 2;
  const shifts = useMemo(() => Array.from({ length: n }, (_, i) => (i - mid) * spread), [n, spread, mid]);
  const angles = useMemo(() => Array.from({ length: n }, (_, i) => (i - mid) * 7), [n, mid]);
  const opacities = useMemo(() => {
    if (n === 1) return [1];
    return Array.from({ length: n }, (_, i) => 0.14 + (0.88 - 0.14) * (i / (n - 1)));
  }, [n]);

  return (
    <div
      className="relative w-[940px] max-w-[92vw] h-[660px] overflow-visible z-0"
      style={{ transform: `translate(${offsetX}px, ${offsetY}px)` }}
      aria-roledescription="carousel"
    >
      <ul className="relative h-full">
        {projects.map((p, i) => {
          const isActive = i === active;
          const x = shifts[i];
          const angle = isActive ? 0 : angles[i];
          const opacity = isActive ? 1 : opacities[i];
          const z = isActive ? 60 : 10 + i;
          const scale = isActive ? 1.10 : 0.92;

          return (
            <li
              key={p.id}
              onMouseEnter={() => { pausedRef.current = true; clearTimer(); }}
              onMouseLeave={() => { pausedRef.current = false; startTimer(); }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-400 ease-out"
              style={{
                transform: `translate(calc(-50% + ${x}px), -50%) rotate(${angle}deg) scale(${scale})`,
                zIndex: z,
                opacity,
                pointerEvents: "auto",
              }}
            >
              <div className={isActive ? "" : "pointer-events-none"}>
                <ProjectInfo data={p} active={isActive} showMeta={isActive} />
              </div>
            </li>
          );
        })}
      </ul>

      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 z-20"
        style={{
          left: `calc(50% - ${offsetX * 0.2}px)`,
          top: `calc(50% + ${buttonsOffsetY}px)`,
          transform: "translateX(-50%)",
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{ columnGap: `${buttonsGap}px` }}
        >
          <button
            onClick={goPrev}
            className="pointer-events-auto h-10 w-10 rounded-full border 
            bg-gray-500 hover:bg-gray-700 cursor-pointer shadow-md backdrop-blur-sm grid place-items-center"
            aria-label="Previous"
            title="Previous"
          >
            ◀
          </button>
          <button
            onClick={goNext}
            className="pointer-events-auto h-10 w-10 rounded-full border 
            bg-gray-500 hover:bg-gray-700 cursor-pointer shadow-md backdrop-blur-sm grid place-items-center"
            aria-label="Next"
            title="Next"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}
