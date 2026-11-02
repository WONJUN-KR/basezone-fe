// 카카오 지도 JS SDK 로더. services(장소 검색 · 좌표->주소)까지 같이 불러옴.
// 카카오 정책: 검색 결과(이름 · 주소 · 전화 · 좌표)는 화면에만 쓰고 저장하지 않음. 저장은 장소 ID 만.
// 검색은 서버를 거치지 않고 기기에서 바로 함 (현재 위치가 서버로 가지 않게)

declare global {
  interface Window {
    kakao: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}

let loading: Promise<typeof window.kakao> | null = null;

export function loadKakaoMaps(): Promise<typeof window.kakao> {
  if (typeof window === "undefined") return Promise.reject(new Error("브라우저에서만 불러올 수 있어요"));
  if (window.kakao?.maps?.services) return Promise.resolve(window.kakao);
  if (loading) return loading;

  const key = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
  if (!key) return Promise.reject(new Error("NEXT_PUBLIC_KAKAO_JS_KEY 가 비어 있어요 (.env.local)"));

  loading = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&libraries=services&autoload=false`;
    script.async = true;
    script.onload = () => window.kakao.maps.load(() => resolve(window.kakao));
    script.onerror = () => {
      loading = null;
      reject(new Error("카카오 지도 SDK 를 불러오지 못했어요"));
    };
    document.head.appendChild(script);
  });
  return loading;
}
