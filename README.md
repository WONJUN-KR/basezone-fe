# ballpark-fe

캐치볼 장소 · 배팅장 지도 앱의 화면. 웹으로 만들고 Capacitor 로 iOS · 안드로이드 앱에 넣음.

## 스택
- Next.js 16 (App Router, 정적 export) · React 19 · TypeScript · Tailwind CSS 4
- Capacitor 7 (Node 22 로 올리면 8 로)
- 카카오 지도 JS SDK (지도 · 장소 검색 · 좌표→주소)

## 로컬 실행
```
cp .env.example .env.local   # 카카오 JS 키 채우기
npm install
npm run dev                  # http://localhost:3000
```

## 앱 빌드 (처음 한 번)
```
npm run build                # out/ 생성
npx cap add ios              # Xcode · CocoaPods 필요
npx cap sync
```

## 디자인 토큰
`src/styles/tokens.css` = 피그마 'D 개발 전달 사항' 판의 색 · 둥근 정도 · 간격 · 글자 스타일.
- 색: `bg-bg-canvas`, `text-text-secondary`, `border-border-default` ...
- 글자: `type-title-26`, `type-body-15` ...
- 간격: `var(--space-16)`

## 카카오 정책
- 검색 결과(이름 · 주소 · 전화 · 좌표)는 화면에만 쓰고 서버 · 기기에 저장하지 않음. 서버로 보내는 건 카카오 장소 ID 만
- 장소 검색은 기기에서 JS SDK 로 바로 (서버를 거치면 현재 위치가 서버로 감)
- 지도는 멈춘 뒤 0.6초 + 범위가 크게 바뀔 때만 다시 검색 (무료 일간 한도: 키워드 10만)
