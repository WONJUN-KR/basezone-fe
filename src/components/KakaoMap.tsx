"use client";

import { useEffect, useRef, useState } from "react";

import { loadKakaoMaps } from "@/lib/kakao";

// 잠실 (지도 첫 화면 기본 위치)
const DEFAULT_CENTER = { lat: 37.5133, lng: 127.1001 };

export default function KakaoMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadKakaoMaps()
      .then((kakao) => {
        if (cancelled || !ref.current) return;
        new kakao.maps.Map(ref.current, {
          center: new kakao.maps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng),
          level: 5,
        });
      })
      .catch((e: Error) => setError(e.message));
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="flex h-full items-center justify-center p-6 type-body-15 text-text-secondary">
        {error}
      </div>
    );
  }
  return <div ref={ref} className="h-full w-full bg-map-land" />;
}
