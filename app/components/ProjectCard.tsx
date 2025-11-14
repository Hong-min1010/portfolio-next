"use client";

import { useMemo, useState } from "react";
import ProjectInfo, { Project } from "./ProjectInfo";

type Props = {
  projects: Project[];
  spread?: number;
  angles?: number[];
  stackRotate?: number;
  offsetX?: number;
  offsetY?: number;
};

export default function ProjectCard({
  projects,
  spread = 140,
  angles = [-16, -6, 6, 16],
  stackRotate = 12,
  offsetX = 20,
  offsetY = 160,
}: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  const shifts = useMemo(() => {
    const n = projects.length;
    if (n === 0) return [];
    const mid = (n - 1) / 2;
    return Array.from({ length: n }, (_, i) => (i - mid) * spread);
  }, [projects.length, spread]);

  return (
    <div className="relative w-[820px] max-w-[92vw] h-[680px] overflow-visible">
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${offsetX}px, ${offsetY}px) rotate(${stackRotate}deg)`,
          transformOrigin: "50% 70%",
        }}
      >
        <ul className="relative h-full">
          {projects.map((p, i) => {
            const active = hovered === i;
            const angle =
              angles[i] ?? angles[(i % angles.length + angles.length) % angles.length];
            const transformWhenActive =
              `translate(-50%, -50%) rotate(${ -stackRotate }deg) scale(1.06)`;
            const transformWhenIdle =
              `translate(calc(-50% + ${shifts[i]}px), -50%) rotate(${angle}deg) scale(0.93)`;

            return (
              <li
                key={p.id}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none transition-all duration-300"
                style={{
                  transform: active ? transformWhenActive : transformWhenIdle,
                  zIndex: active ? 30 : 10,
                  opacity: hovered === null ? 1 : active ? 1 : 0.42,
                  filter: active ? "none" : hovered !== null ? "blur(0.2px)" : "none",
                }}
              >
                <ProjectInfo
                  data={p}
                  active={active}
                  thumbnail={p.thumbnail}
                  body={p.body}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
