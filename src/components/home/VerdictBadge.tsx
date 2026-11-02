import Icon from "@/components/icons/Icon";
import { type Verdict, VERDICT_LABEL } from "@/lib/places";

const BG: Record<Verdict, string> = {
  safe: "bg-status-safe",
  review: "bg-status-review",
  out: "bg-status-out",
};

// 피그마 Badge/상태: 글자 없이 아이콘 + 크림 실밥 링. 화면 읽기용 이름은 aria-label 로
export default function VerdictBadge({
  verdict,
  size = 32,
}: {
  verdict: Verdict;
  size?: number;
}) {
  return (
    <span
      role="img"
      aria-label={VERDICT_LABEL[verdict]}
      style={
        {
          width: size,
          height: size,
          "--stitch-inset": "3px",
          "--stitch-color": "rgb(246 240 230 / 0.6)",
        } as React.CSSProperties
      }
      className={`stitch inline-flex shrink-0 items-center justify-center rounded-full text-icon-inverse ${BG[verdict]}`}
    >
      {verdict === "review" ? (
        <span className="type-label-15 leading-none">?</span>
      ) : (
        <Icon
          name={verdict === "safe" ? "check" : "close"}
          size={size * 0.55}
          strokeWidth={2.6}
        />
      )}
    </span>
  );
}
