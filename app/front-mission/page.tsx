import Image from "next/image";
import ProjectReviewCard from "../components/ProjectReviewCard";

export default function Damo() {
  return (
    <div className="w-full h-screen flex flex-row items-center justify-center pb-30">
      <ProjectReviewCard
        title="Front-mission (게시판)"
        architecture={
          <>
            <Image src="/assets/Front_Art.png" alt="Front-mission 아키텍처" width={400} height={400} />
          </>
        }
        troubles={[
          {
            problem: <>문제문제문제문제문제문제문제문제문제문제4</>,
            solution: <>해결해결해결해결해결해결해결해결해결해결4</>,
            result: <>결과결과결과결과결과결과결과결과결과결과4</>,
          },
          {
            problem: <>문제문제문제문제문제문제문제문제문제문제4</>,
            solution: <>해결해결해결해결해결해결해결해결해결해결4</>,
            result: <>결과결과결과결과결과결과결과결과결과결과4</>,
          },
        ]}
        drawbacks={
          <ol className="flex flex-col gap-2 text-lg">
            <li className="text-base">1. 프로젝트 완성에 집중하다 보니, 사용자 관점에서의 <span className="font-bold">UI/UX</span> 세부 완성도가 다소 부족했던 점이 아쉬움.</li>
          </ol>
        }
        improvements={
          <ol className="flex flex-col gap-2 text-lg">
            <li className="text-base">1. 일정에 여유를 두고, 주변 동료나 지인에게 UI/UX 관련 <span className="font-bold">피드백을 받아 개선</span>하는 과정을 추가하면 더 완성도 있는 결과물을 만들 수 있을 것 같음.</li>
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
