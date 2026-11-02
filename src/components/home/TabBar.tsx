import Icon from "@/components/icons/Icon";
import type { IconName } from "@/components/icons/icons";

const TABS: { key: string; label: string; icon: IconName }[] = [
  { key: "map", label: "지도", icon: "map" },
  { key: "saved", label: "즐겨찾기", icon: "bookmark" },
  { key: "alerts", label: "알림", icon: "bell" },
  { key: "my", label: "내 정보", icon: "user" },
];

// 피그마 TabBar: 고른 탭은 벽돌색 굵은 글자 + 아래 실밥 점선. 다른 탭 화면은 다음 작업에서 연결
export default function TabBar({ active = "map" }: { active?: string }) {
  return (
    <nav className="flex border-t border-border-subtle bg-bg-surface pb-[env(safe-area-inset-bottom)]">
      {TABS.map(({ key, label, icon }) => {
        const on = key === active;
        return (
          <button
            key={key}
            type="button"
            aria-current={on ? "page" : undefined}
            className="flex h-[60px] flex-1 flex-col items-center justify-center gap-[var(--space-4)]"
          >
            <Icon name={icon} size={24} className="text-icon-primary" />
            <span
              className={
                on
                  ? "type-label-13 border-b-[1.5px] border-dashed border-stitch pb-[1px] text-text-brand"
                  : "type-caption-11 text-text-secondary"
              }
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
