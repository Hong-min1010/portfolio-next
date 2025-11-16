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
            problem: <>자동 로그인 기능 구현 과정에서 <br /><span className="ml-12">AccessToken과 RefreshToken이 혼용되어 사용됨.</span></>,
            solution: <>RefreshToken을 통해 AccessToken과 RefreshToken을 모두 <br /><span className="ml-12">재발급하는 방식으로 인증 구조 개선.</span></>,
            result: <>토큰 탈취 위험이 감소하고, RefreshToken의 주기적 재발급을 <br /><span className="mml-12">통해 사용자 정보 보안성이 강화됨.</span></>,
          },
          {
            problem: <>카테고리 수정 페이지 진입 시, 사용자가 이전에 선택했던 <br /><span className="ml-12">카테고리가 순서대로 표시되지 않거나 누락되는 현상이 발생함.</span></>,
            solution: <>await를 활용해 전체 카테고리 → 사용자 선택 카테고리 순으로 <br /><span className="ml-12">데이터를 직렬 처리.</span></>,
            result: <> 비동기 로딩 문제로 인한 이전에 사용자가 선택했던 카테고리와 <br /><span className="ml-12">불일치 현상이 해결됨.</span></>,
          },
        ]}
        drawbacks={
          <ol className="flex flex-col gap-2 text-lg">
            <li className="text-sm">1. 실시간 채팅 기능 설계는 완료했으나, 프론트엔드·백엔드 간 <span className="font-bold">기술 협의 및 일정 조율</span>이 충분하지 않아 프로젝트 기간 내에 적용하지 못함.</li>
            <li className="text-sm">2. 기간 내 프로젝트 마무리가 안되어 <span className="font-bold">최종 배포를 진행하지 못함</span>.</li>
          </ol>
        }
        improvements={
          <ol className="flex flex-col gap-2 text-lg">
            <li className="text-sm">1. 정기적인 회의, 코드 리뷰 및 이슈 공유 루틴을 통해 <span className="font-bold">협업 및 일정 관리 체계를 강화</span>할 필요.</li>
            <li className="text-sm">2. 개발 후 배포가 아니라, <span className="font-bold">초기부터 배포 환경을 구축</span>하여 점진적으로 배포·테스트하는 방식 도입.</li>
          </ol>
        }
        links={[
        { label: "GitHub", href: "https://github.com/Damo-App/damo-front" },
        ]}
      />
    </div>
  );
}
