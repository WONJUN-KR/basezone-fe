import type { NextConfig } from "next";

// Capacitor 앱은 정적 파일(out/)을 앱 안에 넣어서 씀 -> 서버 기능(API 라우트 · SSR) 없이 정적 export
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
