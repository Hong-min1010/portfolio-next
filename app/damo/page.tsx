import Image from "next/image";
import ProjectReviewCard from "../components/ProjectReviewCard";

export default function Damo() {
  return (
    <div className="w-full h-screen flex flex-row items-center justify-center pb-30">
      <ProjectReviewCard
        title="Damo (통합 모임 서비스)"
        architecture={
          <>
            <Image src="/assets/Damo_Ar.png" alt="Damo 아키텍처" width={400} height={400} />
          </>
        }
        troubles={[
          {
            problem: <>문제문제문제문제문제문제문제문제문제문제1</>,
            solution: <>해결해결해결해결해결해결해결해결해결해결1</>,
            result: <>결과결과결과결과결과결과결과결과결과결과1</>,
          },
          {
            problem: <>문제문제문제문제문제문제문제문제문제문제1</>,
            solution: <>해결해결해결해결해결해결해결해결해결해결1</>,
            result: <>결과결과결과결과결과결과결과결과결과결과1</>,
          },
        ]}
        drawbacks={
          <ol className="flex flex-col gap-2 text-lg">
            <li className="text-base">1. 실시간 채팅 기능 설계는 완료했으나, 프론트엔드·백엔드 간 <span className="font-bold">기술 협의 및 일정 조율</span>이 충분하지 않아 프로젝트 기간 내에 적용하지 못함.</li>
            <li className="text-base">2. 기간 내 프로젝트 마무리가 안되어 <span className="font-bold">최종 배포를 진행하지 못함</span>.</li>
          </ol>
        }
        improvements={
          <ol className="flex flex-col gap-2 text-lg">
            <li className="text-base">1. 정기적인 회의, 코드 리뷰 및 이슈 공유 루틴을 통해 <span className="font-bold">협업 및 일정 관리 체계를 강화</span>할 필요.</li>
            <li className="text-base">2. 개발 후 배포가 아니라, <span className="font-bold">초기부터 배포 환경을 구축</span>하여 점진적으로 배포·테스트하는 방식 도입.</li>
          </ol>
        }
        links={[
        { label: "GitHub", href: "https://github.com/Damo-App/damo-front" },
        ]}
      />
    </div>
  );
}
