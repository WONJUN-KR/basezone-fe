"use client";

import { useCallback, useMemo, useState } from "react";

import FilterChips, { type FilterKey } from "@/components/home/FilterChips";
import PlaceCard from "@/components/home/PlaceCard";
import PlaceList from "@/components/home/PlaceList";
import SearchBar from "@/components/home/SearchBar";
import TabBar from "@/components/home/TabBar";
import Icon from "@/components/icons/Icon";
import KakaoMap, { DEFAULT_CENTER } from "@/components/KakaoMap";
import { MOCK_PLACES, type Place, distanceMeters } from "@/lib/places";

// 필터: 캐치볼 · 배팅장은 종류(둘 다 끄면 둘 다 보임), 왼손 타석 · 지금 여유는 조건
// 왼손 타석은 배팅장에만 있는 조건이라 켜면 종류와 상관없이 왼손 타석 있는 배팅장만
function applyFilters(places: Place[], f: Set<FilterKey>): Place[] {
  const kindOn = f.has("catchball") || f.has("batting");
  return places.filter((p) => {
    if (f.has("lefty")) return p.kind === "batting" && (p.leftyBoxes ?? 0) > 0;
    if (kindOn && !f.has(p.kind)) return false;
    if (f.has("quiet") && !(p.kind === "catchball" && p.crowd <= 2))
      return false;
    return true;
  });
}

// 홈 지도 (피그마 F10 · F11)
// - 폰 · 앱(md 미만): 지도 전체 + 위에 검색창 · 칩, 아래 탭, 핀을 누르면 장소 카드
// - PC(md 이상): 왼쪽 패널(검색창 · 칩 · 목록 · 탭) + 오른쪽 지도, 장소 카드는 지도 왼쪽 아래
export default function HomeMap() {
  const [filters, setFilters] = useState<Set<FilterKey>>(
    () => new Set(["catchball"]),
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [me, setMe] = useState<{ lat: number; lng: number } | null>(null);
  const [locError, setLocError] = useState<string | null>(null);

  const toggle = useCallback((key: FilterKey) => {
    setFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  // 거리는 내 위치를 아직 모르면 지도 첫 위치 기준 (기기 안에서만 계산)
  const origin = me ?? DEFAULT_CENTER;
  const visible = useMemo(
    () =>
      applyFilters(MOCK_PLACES, filters)
        .map((p) => ({ ...p, distance: distanceMeters(origin, p) }))
        .sort((a, b) => a.distance - b.distance),
    [filters, origin],
  );
  const selected = visible.find((p) => p.id === selectedId) ?? null;

  // 내 위치: 웹은 브라우저 위치, 앱은 나중에 Capacitor 위치 플러그인으로 (isNativeApp 분기)
  const locate = () => {
    if (!navigator.geolocation)
      return setLocError("이 기기에서는 위치를 쓸 수 없어요");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocError(null);
        setMe({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => setLocError("위치 권한을 허용하면 내 주변을 보여 드려요"),
      { enableHighAccuracy: true, timeout: 10_000 },
    );
  };

  return (
    <main className="flex h-dvh w-full flex-col md:grid md:grid-cols-[380px_1fr]">
      <aside className="flex min-h-0 flex-col border-r border-border-subtle bg-bg-surface max-md:hidden">
        <div className="flex flex-col gap-[var(--space-12)] p-[var(--space-20)]">
          <SearchBar />
          <FilterChips selected={filters} onToggle={toggle} wrap />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <PlaceList
            places={visible}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
        <TabBar />
      </aside>

      <div className="relative min-h-0 flex-1">
        <KakaoMap
          places={visible}
          selectedId={selectedId}
          onSelect={setSelectedId}
          center={me ?? undefined}
        />

        <div className="absolute inset-x-0 top-0 flex flex-col gap-[var(--space-10)] px-[var(--space-16)] pt-[calc(env(safe-area-inset-top)+var(--space-12))] md:hidden">
          <SearchBar />
          <FilterChips selected={filters} onToggle={toggle} />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-end gap-[var(--space-12)] p-[var(--space-16)] md:items-start md:p-[var(--space-24)]">
          {locError && (
            <p
              role="status"
              className="type-caption-13 pointer-events-auto self-center rounded-full bg-bg-inverse px-[var(--space-16)] py-[var(--space-8)] text-text-inverse"
            >
              {locError}
            </p>
          )}
          <button
            type="button"
            aria-label="내 위치로 이동"
            onClick={locate}
            style={{ "--stitch-inset": "3.5px" } as React.CSSProperties}
            className="stitch pointer-events-auto flex size-[48px] items-center justify-center rounded-full bg-bg-surface text-icon-primary shadow-card md:self-end"
          >
            <Icon name="locate" size={24} strokeWidth={2} />
          </button>
          {selected && (
            <div className="pointer-events-auto w-full md:max-w-[358px]">
              <PlaceCard place={selected} distance={selected.distance} />
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden">
        <TabBar />
      </div>
    </main>
  );
}
