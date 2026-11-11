"use client";

import { useEffect, useRef, useState } from "react";

import { createPinElement, setPinSelected } from "@/components/home/mapPin";
import { loadKakaoMaps } from "@/lib/kakao";
import type { Place } from "@/lib/places";

// 잠실 (지도 첫 화면 기본 위치)
export const DEFAULT_CENTER = { lat: 37.5133, lng: 127.0901 };

type Props = {
  places: Place[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  center?: { lat: number; lng: number }; // 바뀌면 그 위치로 이동 (내 위치 버튼)
};

export default function KakaoMap({
  places,
  selectedId,
  onSelect,
  center,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const overlaysRef = useRef<
    { id: string; overlay: any; el: HTMLElement }[] // eslint-disable-line @typescript-eslint/no-explicit-any
  >([]);
  const selectedIdRef = useRef(selectedId);
  const onSelectRef = useRef(onSelect);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    let cancelled = false;
    loadKakaoMaps()
      .then((kakao) => {
        if (cancelled || !ref.current) return;
        const map = new kakao.maps.Map(ref.current, {
          center: new kakao.maps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng),
          level: 5,
        });
        kakao.maps.event.addListener(map, "click", () =>
          onSelectRef.current(null),
        );
        mapRef.current = map;
        setReady(true);
      })
      .catch((e: Error) => setError(e.message));
    return () => {
      cancelled = true;
    };
  }, []);

  // 핀 다시 그리기는 장소가 바뀔 때만
  useEffect(() => {
    if (!ready) return;
    const kakao = window.kakao;
    overlaysRef.current.forEach(({ overlay }) => overlay.setMap(null));
    overlaysRef.current = places.map((p) => {
      const el = createPinElement(p, p.id === selectedIdRef.current, () =>
        onSelectRef.current(p.id),
      );
      const overlay = new kakao.maps.CustomOverlay({
        map: mapRef.current,
        position: new kakao.maps.LatLng(p.lat, p.lng),
        content: el,
        yAnchor: 1,
        zIndex: p.id === selectedIdRef.current ? 10 : 1,
        clickable: true,
      });
      return { id: p.id, overlay, el };
    });
  }, [ready, places]);

  // 선택이 바뀌면 있는 핀의 크기 · 순서만 바꿈 (다시 만들지 않아 키보드 포커스 유지). 선택한 핀은 크게, 맨 위로
  useEffect(() => {
    selectedIdRef.current = selectedId;
    overlaysRef.current.forEach(({ id, overlay, el }) => {
      const selected = id === selectedId;
      setPinSelected(el, selected);
      overlay.setZIndex(selected ? 10 : 1);
    });
  }, [selectedId]);

  useEffect(() => {
    if (!ready || !center) return;
    mapRef.current.panTo(new window.kakao.maps.LatLng(center.lat, center.lng));
  }, [ready, center]);

  if (error) {
    return (
      <div className="flex h-full items-center justify-center p-6 type-body-15 text-text-secondary">
        {error}
      </div>
    );
  }
  return <div ref={ref} className="h-full w-full bg-map-land" />;
}
