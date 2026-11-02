import type { CapacitorConfig } from "@capacitor/cli";

// 앱 ID 는 PF 로 시작하고 앱 이름은 넣지 않음. 표시 이름은 빌드할 때 환경 변수로
const config: CapacitorConfig = {
  appId: "kr.pf.ballpark",
  appName: process.env.APP_NAME || "ballpark",
  webDir: "out",
};

export default config;
