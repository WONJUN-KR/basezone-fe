// 지도에 보이는 장소. 서버 API(GET 캐치볼 장소 · 배팅장 우리 데이터)를 붙이기 전까지는 MOCK_PLACES 로 화면을 만듦
// 배팅장 이름 · 주소 · 좌표는 원래 기기에서 카카오 검색 결과로 채우는 값 (저장 X) - 지금은 화면 확인용 임시 값

export type Verdict = "safe" | "review" | "out";

export const VERDICT_LABEL: Record<Verdict, string> = {
  safe: "가능",
  review: "확인 필요",
  out: "불가",
};

// 혼잡도 1~3 = 사람 아이콘 3칸 중 채우는 수. 피그마 Crowd 부품 · 백엔드 CrowdCalculator 와 같은 3단계
export type CrowdLevel = 1 | 2 | 3;
export const CROWD_LABEL: Record<CrowdLevel, string> = {
  1: "여유",
  2: "보통",
  3: "혼잡",
};

export type CatchballPlace = {
  kind: "catchball";
  id: string;
  name: string;
  lat: number;
  lng: number;
  verdict: Verdict;
  reportCount: number;
  lastReportedAt: string; // ISO
  crowd: CrowdLevel;
};

export type BattingPlace = {
  kind: "batting";
  id: string; // 카카오 장소 ID
  name: string;
  lat: number;
  lng: number;
  leftyBoxes: number | null; // 왼손 타석 수 (모르면 null)
};

export type Place = CatchballPlace | BattingPlace;

const daysAgo = (d: number) =>
  new Date(Date.now() - d * 86_400_000).toISOString();

export const MOCK_PLACES: Place[] = [
  {
    kind: "catchball",
    id: "c1",
    name: "잠실한강공원 잔디밭",
    lat: 37.5185,
    lng: 127.0868,
    verdict: "safe",
    reportCount: 12,
    lastReportedAt: daysAgo(3),
    crowd: 2,
  },
  {
    kind: "catchball",
    id: "c2",
    name: "아시아공원 잔디광장",
    lat: 37.5081,
    lng: 127.0742,
    verdict: "safe",
    reportCount: 7,
    lastReportedAt: daysAgo(0),
    crowd: 1,
  },
  {
    kind: "catchball",
    id: "c3",
    name: "신천중 옆 공터",
    lat: 37.5148,
    lng: 127.0905,
    verdict: "review",
    reportCount: 2,
    lastReportedAt: daysAgo(9),
    crowd: 1,
  },
  {
    kind: "catchball",
    id: "c4",
    name: "잠실일초 운동장",
    lat: 37.5122,
    lng: 127.0985,
    verdict: "out",
    reportCount: 5,
    lastReportedAt: daysAgo(1),
    crowd: 3,
  },
  {
    kind: "catchball",
    id: "c5",
    name: "잠실엘스 단지 공원",
    lat: 37.5109,
    lng: 127.0821,
    verdict: "safe",
    reportCount: 4,
    lastReportedAt: daysAgo(2),
    crowd: 2,
  },
  {
    kind: "batting",
    id: "b1",
    name: "잠실 스윙존",
    lat: 37.5098,
    lng: 127.0929,
    leftyBoxes: 2,
  },
  {
    kind: "batting",
    id: "b2",
    name: "종합운동장 배팅센터",
    lat: 37.5129,
    lng: 127.0768,
    leftyBoxes: null,
  },
];

// 두 좌표 사이 거리(m) - 화면 표시용 (서버로 보내지 않음)
export function distanceMeters(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6_371_000;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function formatDistance(m: number): string {
  return m < 1000
    ? `${Math.round(m / 10) * 10}m`
    : `${(m / 1000).toFixed(1)}km`;
}

export function formatReportAge(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return "오늘 제보";
  return `${days}일 전 제보`;
}
