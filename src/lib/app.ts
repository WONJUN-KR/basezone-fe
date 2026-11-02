// 앱 이름은 코드에 넣지 않고 환경 변수로만 받음 (이름이 바뀌어도 코드는 그대로)
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "";
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8090";
