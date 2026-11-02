import KakaoMap from "@/components/KakaoMap";

// 화면 폭으로 웹용 · 앱용을 나눔 (md = 768px)
// - 768px 미만(폰 · 앱): 지도 전체 화면, 목록은 나중에 아래에서 올라오는 시트로
// - 768px 이상(PC 웹): 왼쪽 목록 패널 + 오른쪽 지도
export default function Home() {
  return (
    <main className="h-dvh w-full md:grid md:grid-cols-[360px_1fr]">
      <aside className="border-r border-border-subtle bg-bg-surface max-md:hidden md:flex md:flex-col md:overflow-y-auto">
        <h1 className="type-heading-18 px-[var(--space-20)] py-[var(--space-20)]">
          주변 장소
        </h1>
      </aside>
      <div className="h-full min-w-0">
        <KakaoMap />
      </div>
    </main>
  );
}
