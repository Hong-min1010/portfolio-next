import Image from "next/image";
import ProjectReviewCard from "../components/ProjectReviewCard";

export default function Traffic() {
  return (
    <div className="w-full h-screen flex flex-row items-center justify-center pb-30">
      <ProjectReviewCard
        title="Traffic (이천시 교통정보 조회 서비스)"
        architecture={
          <>
            <Image src="/assets/Traffic_Art.png" alt="Damo 아키텍처" width={400} height={400} />
          </>
        }
        troubles={[
          {
            problem: <>문제문제문제문제문제문제문제문제문제문제3</>,
            solution: <>해결해결해결해결해결해결해결해결해결해결3</>,
            result: <>결과결과결과결과결과결과결과결과결과결과3</>,
          },
          {
            problem: <>문제문제문제문제문제문제문제문제문제문제3</>,
            solution: <>해결해결해결해결해결해결해결해결해결해결3</>,
            result: <>결과결과결과결과결과결과결과결과결과결과3</>,
          },
        ]}
        drawbacks={
          <ol className="flex flex-col gap-2 text-lg">
            <li className="text-base">1. <span className="font-bold">이천시 한정</span> 교통정보를 받아오기 때문에 타지역 사용자는 사용 할 필요가 없음.</li>
            <li className="text-base">2. 첫 솔로 프로젝트로 인해 프로젝트 관련 <span className="font-bold">자료 정리가 미흡</span>.</li>
          </ol>
        }
        improvements={
          <ol className="flex flex-col gap-2 text-lg">
            <li className="text-base">1. 공공데이터 포탈에서 제공하는 <span className="font-bold">전국 교통정보 API를 사용</span>하여 프로젝트 확장 가능.</li>
            <li className="text-base">2. <span className="font-bold">Notion을 활용</span>하여 일정 관리 및 프로젝트 관련 자료 정리.</li>
          </ol>
        }
        links={[
        { label: "GitHub", href: "https://github.com/Hong-min1010/traffic" },
        { label: "Live Demo", href: "https://traffic-pied.vercel.app/", newTab: true },
        ]}
      />
    </div>
  );
}
