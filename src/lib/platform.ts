import { Capacitor } from "@capacitor/core";

// 앱(iOS · Android) 안에서 도는지, 브라우저에서 도는지
// 위치 · 푸시처럼 웹과 앱이 다르게 동작하는 곳에서만 분기
export function isNativeApp(): boolean {
  return Capacitor.isNativePlatform();
}

export type Platform = "ios" | "android" | "web";

export function getPlatform(): Platform {
  return Capacitor.getPlatform() as Platform;
}
