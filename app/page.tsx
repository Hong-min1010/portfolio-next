import Image from "next/image";
import ProjectCarousel from "./components/ProjectCarousel";
import { Project } from "./components/ProjectInfo";

const projects: Project[] = [
  {
    id: "p1",
    title: "Damo (통합 모임 서비스)",
    href: "/damo",
    thumbnail: (
      <Image
        src="/assets/Damo_PF.png"
        alt="Damo 썸네일"
        width={32}
        height={32}
        className="object-cover"
      />
    ),
    body: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-2">
        <Image
          src="/assets/Damo_Ar.png"
          alt="Damo 아키텍처"
          width={260}
          height={260}
          className="rounded-lg object-contain"
        />
        <p className="text-xs text-neutral-700 text-center">
          통합 모임 생성/관리, 공지, 일정 공유, 실시간 채팅 기능을 제공하는 서비스입니다.
        </p>
      </div>
    ),
  },

  {
    id: "p2",
    title: "Cookking (레시피 커뮤니티)",
    href: "/cookking",
    thumbnail: (
      <Image
        src="/assets/Cookking_PF.png"
        alt="Cookking 썸네일"
        width={32}
        height={32}
        className="object-cover"
      />
    ),
    body: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-2">
        <Image
          src="/assets/Cookking_Art.png"
          alt="Cookking 아키텍처"
          width={260}
          height={260}
          className="rounded-lg object-contain"
        />
        <p className="text-xs text-neutral-700 text-center">
          레시피 공유 / 저장 / 추천 기능을 제공하는 커뮤니티 기반 요리 서비스입니다.
        </p>
      </div>
    ),
  },

  {
    id: "p3",
    title: "Traffic (이천시 교통정보 조회)",
    href: "/traffic",
    thumbnail: (
      <Image
        src="/assets/Traffic_PF.png"
        alt="Traffic 썸네일"
        width={32}
        height={32}
        className="object-cover"
      />
    ),
    body: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-2">
        <Image
          src="/assets/Traffic_Art.png"
          alt="Traffic 아키텍처"
          width={260}
          height={260}
          className="rounded-lg object-contain"
        />
        <p className="text-xs text-neutral-700 text-center">
          경기도 이천시의 실시간 도로 혼잡도 / 대중교통 흐름 조회 기능을 제공합니다.
        </p>
      </div>
    ),
  },

  {
    id: "p4",
    title: "Front-Mission (게시판)",
    href: "/front-mission",
    thumbnail: (
      <Image
        src="/assets/Front_PF.png"
        alt="Front Mission 썸네일"
        width={32}
        height={32}
        className="object-cover"
      />
    ),
    body: (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-2">
        <Image
          src="/assets/Front_Art.png"
          alt="Front Mission 아키텍처"
          width={260}
          height={260}
          className="rounded-lg object-contain"
        />
        <p className="text-xs text-neutral-700 text-center mt-4">
          Next.js + React 기반의 게시판 서비스입니다.
        </p>
      </div>
    ),
  },
];

export default function Home() {
  return (
    <section className="w-full overflow-x-clip">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 min-h-[calc(100dvh-4rem)] flex items-center pt-28 md:pt-32 pb-20">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-32 md:gap-40 items-center">
          <div className="text-center md:text-left mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900">Projects</h2>
            <p className="mt-4 text-neutral-600 text-base md:text-lg">Hover to pause.</p>
            <p className="text-neutral-600 text-base md:text-lg">Use arrows or wait for auto-slide.</p>
          </div>

          <div className="justify-self-center md:justify-self-end">
            <ProjectCarousel
              projects={projects}
              intervalMs={1500}
              spread={140}
              offsetX={260}
              offsetY={120}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
