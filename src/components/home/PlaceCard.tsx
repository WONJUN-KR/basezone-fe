import Icon from "@/components/icons/Icon";
import VerdictBadge from "@/components/home/VerdictBadge";
import Crowd from "@/components/home/Crowd";
import { type Place, formatDistance, formatReportAge } from "@/lib/places";

type Props = {
  place: Place;
  distance: number | null;
};

// 피그마 Card/장소 (지도): 폭 358 · 둥근 18 · Shadow/Floating · 안쪽 실밥
export default function PlaceCard({ place, distance }: Props) {
  const directions = `https://map.kakao.com/link/to/${encodeURIComponent(place.name)},${place.lat},${place.lng}`;
  return (
    <section
      style={
        {
          "--stitch-inset": "5px",
          "--stitch-color": "var(--color-stitch)",
        } as React.CSSProperties
      }
      className="stitch flex w-full flex-col gap-[var(--space-12)] rounded-xl border-[1.3px] border-border-default bg-bg-surface p-[var(--space-20)] shadow-floating"
    >
      <button
        type="button"
        className="flex items-center justify-between gap-[var(--space-8)] text-left"
      >
        <h2 className="type-title-22 truncate">{place.name}</h2>
        <Icon
          name="chevron"
          size={22}
          strokeWidth={2}
          className="shrink-0 text-icon-secondary"
        />
      </button>

      {place.kind === "catchball" ? (
        <div className="flex items-center gap-[var(--space-8)]">
          <VerdictBadge verdict={place.verdict} />
          <span className="type-body-15 text-text-secondary">
            {formatReportAge(place.lastReportedAt)} · {place.reportCount}건
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-[var(--space-8)]">
          <Icon name="batter-box" size={22} className="text-icon-primary" />
          <span className="type-body-15 text-text-secondary">
            {place.leftyBoxes == null
              ? "왼손 타석 정보 없음"
              : `왼손 타석 ${place.leftyBoxes}개`}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[var(--space-12)]">
          {distance != null && (
            <span className="type-heading-16">{formatDistance(distance)}</span>
          )}
          {place.kind === "catchball" && <Crowd level={place.crowd} />}
        </div>
        <a
          href={directions}
          target="_blank"
          rel="noreferrer"
          style={
            {
              "--stitch-inset": "3px",
              "--stitch-color": "rgb(246 240 230 / 0.5)",
            } as React.CSSProperties
          }
          className="stitch type-label-15 flex h-[44px] items-center gap-[var(--space-6)] rounded-md bg-action-primary px-[var(--space-24)] text-text-inverse"
        >
          <Icon name="navigate" size={18} strokeWidth={2} />
          길찾기
        </a>
      </div>
    </section>
  );
}
