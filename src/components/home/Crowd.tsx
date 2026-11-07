import { CROWD_LABEL, type CrowdLevel } from "@/lib/places";

// 피그마 Crowd 부품: 사람 3칸 중 level 만큼 진하게 + 말
export default function Crowd({ level }: { level: CrowdLevel }) {
  return (
    <span className="flex items-center gap-[var(--space-8)]">
      <span aria-hidden className="flex gap-[2px]">
        {[1, 2, 3].map((i) => (
          <svg
            key={i}
            width="12"
            height="14"
            viewBox="0 0 12 14"
            className={i <= level ? "text-text-primary" : "text-bg-muted"}
          >
            <circle cx="6" cy="3.5" r="3" fill="currentColor" />
            <path d="M0.5 14a5.5 5.5 0 0 1 11 0Z" fill="currentColor" />
          </svg>
        ))}
      </span>
      <span className="type-body-15">{CROWD_LABEL[level]}</span>
    </span>
  );
}
