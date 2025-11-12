"use client";

import { useMemo, useState } from "react";
import ProjectInfo, { Project } from "./ProjectInfo";

type Props = {
  projects: Project[];
  spread?: number;        // 카드 간격(px)
  angles?: number[];      // 각 카드 기본 기울기
  stackRotate?: number;   // 스택 전체 회전(deg, 시계방향)
  offsetX?: number;       // 스택 X 이동(px)
  offsetY?: number;       // 스택 Y 이동(px)
};

export default function ProjectCard({
  projects,
  spread = 140,
  angles = [-16, -6, 6, 16],
  stackRotate = 12,     // 스택을 살짝 기울임
  offsetX = 20,
  offsetY = 160,        // ✅ 더 아래로 내려서 상단 잘림 방지
}: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  // 가운데 기준 등간격 위치
  const shifts = useMemo(() => {
    const n = projects.length;
    if (n === 0) return [];
    const mid = (n - 1) / 2;
    return Array.from({ length: n }, (_, i) => (i - mid) * spread);
  }, [projects.length, spread]);

  return (
    // ✅ 컨테이너에 여유 높이/폭을 명시
    <div className="relative w-[820px] max-w-[92vw] h-[680px] overflow-visible">
      {/* 스택 전체 회전 + 오프셋 */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${offsetX}px, ${offsetY}px) rotate(${stackRotate}deg)`,
          // ✅ 피벗을 아래로: 위쪽으로 튀어나오는 양을 줄임
          transformOrigin: "50% 70%",
        }}
      >
        <ul className="relative h-full">
          {projects.map((p, i) => {
            const active = hovered === i;
            const angle =
              angles[i] ?? angles[(i % angles.length + angles.length) % angles.length];

            // ❗ hover 보정:
            // 부모가 stackRotate만큼 돌아가 있으므로,
            // 자식이 0도로 보이게 하려면 자식에서 -stackRotate로 역회전.
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
                <ProjectInfo data={p} active={active} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
