import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 로깅 설정
  logging: {
    fetches: {
      // 전체 URL을 로그에 포함할지 여부를 설정합니다.
      fullUrl: true,
    },
  },
  // 이미지 설정
  images: {
    // 외부 도메인에서 이미지를 불러올 수 있도록 허용합니다.
    domains: ["shopping-phinf.pstatic.net"],
  },
};

export default nextConfig;
