import Icon from "@/components/icons/Icon";

// 피그마 SearchBar: 높이 52 · 둥근 14 · 테두리 1.3 · Shadow/Card. 검색 화면(F12)은 다음 작업에서 연결
export default function SearchBar() {
  return (
    <button
      type="button"
      className="flex h-[52px] w-full items-center gap-[var(--space-10)] rounded-lg border-[1.3px] border-border-default bg-bg-surface px-[var(--space-16)] text-left shadow-card"
    >
      <Icon
        name="search"
        size={22}
        strokeWidth={2}
        className="text-icon-primary"
      />
      <span className="type-body-16 text-text-secondary">
        어디서 캐치볼 할까요?
      </span>
    </button>
  );
}
