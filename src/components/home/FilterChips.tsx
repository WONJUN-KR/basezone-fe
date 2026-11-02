import Icon from "@/components/icons/Icon";
import type { IconName } from "@/components/icons/icons";

export type FilterKey = "catchball" | "batting" | "lefty" | "quiet";

export const FILTERS: { key: FilterKey; label: string; icon: IconName }[] = [
  { key: "catchball", label: "캐치볼", icon: "baseball" },
  { key: "batting", label: "배팅장", icon: "bat" },
  { key: "lefty", label: "왼손 타석", icon: "batter-box" },
  { key: "quiet", label: "지금 여유", icon: "people" },
];

type Props = {
  selected: Set<FilterKey>;
  onToggle: (key: FilterKey) => void;
  wrap?: boolean; // PC 패널에서는 줄바꿈, 폰에서는 가로로 넘김
};

// 피그마 Chip/필터: 둥근 알약 + 실밥, 고르면 action-selected 바탕
export default function FilterChips({
  selected,
  onToggle,
  wrap = false,
}: Props) {
  return (
    <div
      className={`flex gap-[var(--space-8)] ${wrap ? "flex-wrap" : "no-scrollbar overflow-x-auto"}`}
    >
      {FILTERS.map(({ key, label, icon }) => {
        const on = selected.has(key);
        return (
          <button
            key={key}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(key)}
            style={
              {
                "--stitch-inset": "3px",
                "--stitch-color": on
                  ? "rgb(36 28 23 / 0.32)"
                  : "rgb(36 28 23 / 0.22)",
              } as React.CSSProperties
            }
            className={`stitch flex h-[40px] shrink-0 items-center gap-[var(--space-6)] rounded-full border border-border-default px-[var(--space-16)] shadow-card ${
              on
                ? "bg-action-selected type-label-15"
                : "bg-bg-surface type-body-15"
            }`}
          >
            <Icon
              name={icon}
              size={18}
              strokeWidth={2}
              className="text-icon-primary"
            />
            {label}
          </button>
        );
      })}
    </div>
  );
}
