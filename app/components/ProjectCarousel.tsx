"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import ProjectInfo, { Project } from "./ProjectInfo";

type Props = {
  projects: Project[];
  intervalMs?: number;
  spread?: number;
  offsetX?: number;
  offsetY?: number;
  buttonsOffsetY?: number;
  buttonsGap?: number;
};

export default function ProjectCarousel({
  projects,
  intervalMs = 1500,
  spread = 140,
  offsetX = 260,
  offsetY = 120,
  buttonsOffsetY = 50,
  buttonsGap = 120,
}: Props) {
  const n = projects.length;
  const [active, setActive] = useState(0);

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
          // const opacity = isActive ? 1 : opacities[i];
          const z = isActive ? 60 : 10 + i;
          const scale = isActive ? 1.10 : 0.92;

          return (
            <li
              key={p.id}
              onClick={() => setActive(i)}  
              onMouseEnter={() => { pausedRef.current = true; clearTimer(); }}
              onMouseLeave={() => { pausedRef.current = false; startTimer(); }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-400 ease-out cursor-pointer"
              style={{
                transform: `translate(calc(-50% + ${x}px), -50%) rotate(${angle}deg) scale(${scale})`,
                zIndex: z,
                // opacity,
                pointerEvents: "auto",
              }}
            >
              <div className={isActive ? "" : "pointer-events-none"}>
                <ProjectInfo
                  data={p}
                  active={isActive}
                  showMeta={isActive}
                  thumbnail={p.thumbnail}
                  body={p.body}
                />
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
