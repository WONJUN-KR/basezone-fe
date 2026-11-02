"use client";

import { useEffect, useRef, useState } from "react";

import { createPinElement } from "@/components/home/mapPin";
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
  const overlaysRef = useRef<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any
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

  // 핀 다시 그리기 (장소 · 선택이 바뀔 때). 선택한 핀은 크게, 맨 위로
  useEffect(() => {
    if (!ready) return;
    const kakao = window.kakao;
    overlaysRef.current.forEach((o) => o.setMap(null));
    overlaysRef.current = places.map((p) => {
      const selected = p.id === selectedId;
      return new kakao.maps.CustomOverlay({
        map: mapRef.current,
        position: new kakao.maps.LatLng(p.lat, p.lng),
        content: createPinElement(p, selected, () => onSelectRef.current(p.id)),
        yAnchor: 1,
        zIndex: selected ? 10 : 1,
        clickable: true,
      });
    });
  }, [ready, places, selectedId]);

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
