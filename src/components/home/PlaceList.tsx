import Icon from "@/components/icons/Icon";
import VerdictBadge from "@/components/home/VerdictBadge";
import { type Place, formatDistance, formatReportAge } from "@/lib/places";

type Props = {
  places: (Place & { distance: number | null })[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

// PC 왼쪽 패널 목록 (폰에서는 나중에 아래 시트 목록 F32 로)
export default function PlaceList({ places, selectedId, onSelect }: Props) {
  if (places.length === 0) {
    return (
      <p className="type-body-15 px-[var(--space-20)] py-[var(--space-24)] text-text-secondary">
        조건에 맞는 장소가 없어요
      </p>
    );
  }
  return (
    <ul className="flex flex-col">
      {places.map((p) => (
        <li key={p.id}>
          <button
            type="button"
            aria-current={p.id === selectedId ? "true" : undefined}
            onClick={() => onSelect(p.id)}
            className={`flex w-full items-center gap-[var(--space-12)] border-b border-border-subtle px-[var(--space-20)] py-[var(--space-16)] text-left ${
              p.id === selectedId ? "bg-bg-subtle" : ""
            }`}
          >
            {p.kind === "catchball" ? (
              <VerdictBadge verdict={p.verdict} size={28} />
            ) : (
              <span className="inline-flex size-[28px] shrink-0 items-center justify-center rounded-md bg-bg-inverse text-icon-inverse">
                <Icon name="bat" size={16} strokeWidth={2} />
              </span>
            )}
            <span className="flex min-w-0 flex-1 flex-col gap-[var(--space-2)]">
              <span className="type-heading-16 truncate">{p.name}</span>
              <span className="type-caption-13 text-text-secondary">
                {p.kind === "catchball"
                  ? `${formatReportAge(p.lastReportedAt)} · ${p.reportCount}건`
                  : p.leftyBoxes == null
                    ? "배팅장 · 왼손 타석 정보 없음"
                    : `배팅장 · 왼손 타석 ${p.leftyBoxes}개`}
              </span>
            </span>
            {p.distance != null && (
              <span className="type-label-13 shrink-0">
                {formatDistance(p.distance)}
              </span>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}
