import Image from "next/image";
import ProjectReviewCard from "../components/ProjectReviewCard";

export default function Cookking() {
  return (
    <div className="w-full h-screen flex flex-row items-center justify-center pb-30">
      <ProjectReviewCard
        title="Cookking (레시피 추천 및 공유 서비스)"
        architecture={
          <>
            <Image src="/assets/Cookking_Art.png" alt="Damo 아키텍처" width={400} height={400} />
          </>
        }
        troubles={[
          {
            problem: <>문제문제문제문제문제문제문제문제문제문제2</>,
            solution: <>해결해결해결해결해결해결해결해결해결해결2</>,
            result: <>결과결과결과결과결과결과결과결과결과결과2</>,
          },
          {
            problem: <>문제문제문제문제문제문제문제문제문제문제2</>,
            solution: <>해결해결해결해결해결해결해결해결해결해결2</>,
            result: <>결과결과결과결과결과결과결과결과결과결과2</>,
          },
        ]}
        drawbacks={
          <ol className="flex flex-col gap-2 text-lg">
            <li className="text-base">1. Swagger API 문서를 기반으로 도감 기능을 개발하려 했지만 <span className="font-bold">실제 엔드포인트명이 문서와 다르게 정의</span>되어 있어 연동에 지속적으로 오류가 발생함.</li>
            <li className="text-base">2. 레시피 추천 로직은 정상적으로 동작하지만 기반이 되는 레시피/재료 <span className="font-bold">데이터가 제한적</span>이라 추천 결과가 다양하게 제공되지 못함.</li>
          </ol>
        }
        improvements={
          <ol className="flex flex-col gap-2 text-lg">
            <li className="text-base">1. 개발 초기 단계에서 <span className="font-bold">API 명세와 실제 서버 구현을 사전에 테스트</span>하고, 문서 자동화 도구를 도입해 소통 오류를 줄일 필요가 있음.</li>
            <li className="text-base">2. 레시피 추천 기능은 완성도가 높기 때문에 공공 API 활용/DB 확장 등을 통해 <span className="font-bold">데이터 풀을 넓히는 방향</span>으로 발전 가능.</li>
          </ol>
        }
        links={[
        { label: "GitHub", href: "https://github.com/CooKKKing" },
        { label: "Live Demo", href: "https://www.cookkking.com/", newTab: true },
        ]}
      />
    </div>
  );
}
