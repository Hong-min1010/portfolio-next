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
            problem: <>CI/CD 구축을 위해 HTTP 서버 배포를 계획했으나, <br /><span className="ml-12">프론트엔드 단독 프로젝트로 서버 관리가 불필요함.</span></>,
            solution: <>정적 빌드된 프론트엔드만 배포 가능한 Vercel 플랫폼으로 <br /><span className="ml-12">배포 환경 전환, GitHub Repository와 연동하여 자동 배포</span><span className="ml-14">(CI/CD) 파이프라인을 간소화.</span></>,
            result: <>별도의 서버 구축, 관리 없이 배포 속도 단축 및 유지보수 <br /><span className="ml-12">효율성 향상.</span></>,
          },
          {
            problem: <>초기 교통 데이터는 표 형태로만 표시되어, 사용자가 시간대별 <br /><span className="ml-12">속도 변화를 직관적으로 파악하기 어려움.</span></>,
            solution: <>Chart.js를 도입하여 시간대별 평균 속도와 도로 유형별 <br /><span className="ml-12">평균 속도를 Line Chart를 통하여 데이터 시각화.</span></>,
            result: <>사용자는 시간대별 변화 추세를 한눈에 확인 가능.</>,
          },
        ]}
        drawbacks={
          <ol className="flex flex-col gap-2 text-lg">
            <li className="text-sm">1. <span className="font-bold">이천시 한정</span> 교통정보를 받아오기 때문에 타지역 사용자는 사용 할 필요가 없음.</li>
            <li className="text-sm">2. 프로젝트 기간중 공공데이터포탈 화재로 인해 API 대신 <span className="font-bold">Dummy Data</span>를 사용하여 프로젝트 진행.</li>
          </ol>
        }
        improvements={
          <ol className="flex flex-col gap-2 text-lg">
            <li className="text-sm">1. 공공데이터 포탈에서 제공하는 <span className="font-bold">전국 교통정보 API를 사용</span>하여 프로젝트 확장 가능.</li>
            <li className="text-sm">2. <span className="font-bold">Notion을 활용</span>하여 일정 관리 및 프로젝트 관련 자료 정리.</li>
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
