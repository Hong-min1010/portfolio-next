import ProjectCarousel from "./components/ProjectCarousel";
import { Project } from "./components/ProjectInfo";

const projects: Project[] = [
  { id: "p1", title: "Introduce Project 1", href: "/p1" },
  { id: "p2", title: "Introduce Project 2", href: "/p2" },
  { id: "p3", title: "Introduce Project 3", href: "/p3" },
  { id: "p4", title: "Introduce Project 4", href: "/p4" },
];

export default function Home() {
  return (
    <section className="w-full overflow-x-clip">
      {/* 헤더 높이 고려 + 좌/우 컬럼 간격을 더 넓게 */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 min-h-[calc(100dvh-4rem)] flex items-center pt-28 md:pt-32 pb-20">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-32 md:gap-40 items-center">
          <div className="text-center md:text-left mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900">Projects</h2>
            <p className="mt-4 text-neutral-600 text-base md:text-lg">
              Hover to pause.
            </p>
            <p className="text-neutral-600 text-base md:text-lg">
              Use arrows or wait for auto-slide.
            </p>
          </div>

          <div className="justify-self-center md:justify-self-end">
            <ProjectCarousel
              projects={projects}
              intervalMs={1500}
              spread={140}
              offsetX={260}   // ✅ 텍스트와 완전 분리
              offsetY={120}   // ✅ 헤더와도 안전
            />
          </div>
        </div>
      </div>
    </section>
  );
}
