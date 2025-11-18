import Image from "next/image";
import ProjectReviewCard from "../components/ProjectReviewCard";

export default function Damo() {
  return (
    <div className="w-full flex items-center justify-center">
      <ProjectReviewCard
        title="Front-mission (게시판)"
        architecture={
          <>
            <Image src="/assets/Front_Art.png" alt="Front-mission 아키텍처" width={400} height={400} />
          </>
        }
        troubles={[
          {
            problem: <>localStorage에 토큰을 저장해 자동 로그인 선택 여부와 무관하게 <span className="inline xl:block xl:ml-12">항상 자동 로그인이 되는 현상 발생.</span></>,
            solution: <> “자동 로그인” 선택 시에만 localStorage, <span className="inline xl:block xl:ml-12">미선택 시 sessionStorage에 토큰 저장/복원.</span></>,
            result: <>자동 로그인 선택 시에만 브라우저 재시작 후 로그인 유지, <span className="inline xl:block xl:ml-12">미선택 시 브라우저 종료와 함께 로그아웃(세션 종료) 동작.</span></>,
          },
          {
            problem: <>로컬 환경에서는 정상 동작했으나, Vercel 배포 시 클라이언트 훅 <span className="inline xl:block xl:ml-12">사용으로 인해 정적 최적화 과정에서 하이드레이션 오류 발생.</span></>,
            solution: <>Suspense로 클라이언트 훅의 데이터 준비가 완료될 때까지 렌더링을 지연, <span className="inline xl:block xl:ml-12">force-dynamic 을 선언해 정적 최적화를 비활성화하여 SSR로 강제 전환.</span></>,
            result: <>Vercel 환경에서도 수정 페이지가 정상적으로 렌더링되며, <span className="inline xl:block xl:ml-12">초기 로딩 시점의 하이드레이션 오류와 UI 불일치가 해결됨.</span></>,
          },
        ]}
        drawbacks={
          <ol className="flex flex-col gap-2 text-lg">
            <li className="text-sm">1. 프로젝트 완성에 집중하다 보니, 사용자 관점에서의 <span className="font-bold">UI/UX</span> 세부 완성도가 다소 부족했던 점이 아쉬움.</li>
          </ol>
        }
        improvements={
          <ol className="flex flex-col gap-2 text-lg">
            <li className="text-sm">1. 일정에 여유를 두고, 주변 동료나 지인에게 UI/UX 관련 <span className="font-bold">피드백을 받아 개선</span>하는 과정을 추가하면 더 완성도 있는 결과물을 만들 수 있을 것 같음.</li>
          </ol>
        }
        links={[
        { label: "GitHub", href: "https://github.com/Hong-min1010/front-mission" },
        { label: "Live Demo", href: "https://front-mission.vercel.app/", newTab: true },
        ]}
      />
    </div>
  );
}
