import { ICONS } from "@/components/icons/icons";
import type { Place, Verdict } from "@/lib/places";
import { VERDICT_LABEL } from "@/lib/places";

// 카카오 지도 CustomOverlay 에 넣는 핀 (React 밖이라 DOM 을 직접 만듦)
// 피그마 Map/Pin 캐치볼(상태색 물방울 + 흰 테두리 + 크림 실밥 링) · Map/Pin 배팅장(검은 핀 + 방망이)

const FILL: Record<Verdict, string> = {
  safe: "var(--color-status-safe)",
  review: "var(--color-status-review)",
  out: "var(--color-status-out)",
};

function glyph(place: Place): string {
  if (place.kind === "batting") return ICONS.bat;
  if (place.verdict === "review") {
    return '<text x="12" y="17" text-anchor="middle" font-size="15" font-weight="900" fill="currentColor">?</text>';
  }
  return ICONS[place.verdict === "safe" ? "check" : "close"].replaceAll(
    'stroke-width="1.5"',
    'stroke-width="2.6"',
  );
}

const W = 34;
const H = 44;

// 선택 상태만 바꿈 (요소를 새로 만들면 키보드 포커스가 사라지므로 크기만 고침)
export function setPinSelected(el: HTMLElement, selected: boolean) {
  const scale = selected ? 1.3 : 1;
  const w = `${W * scale}px`;
  const h = `${H * scale}px`;
  el.style.width = w;
  el.style.height = h;
  el.setAttribute("aria-pressed", String(selected));
  const svg = el.querySelector("svg");
  if (svg) {
    svg.setAttribute("width", w);
    svg.setAttribute("height", h);
  }
}

export function createPinElement(
  place: Place,
  selected: boolean,
  onClick: () => void,
): HTMLElement {
  const fill =
    place.kind === "batting" ? "var(--color-bg-inverse)" : FILL[place.verdict];
  const head =
    place.kind === "batting"
      ? '<path d="M7 2h20a5 5 0 0 1 5 5v17a5 5 0 0 1-5 5h-5l-5 13-5-13H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z"'
      : '<path d="M17 42C17 42 2 28.5 2 17a15 15 0 0 1 30 0C32 28.5 17 42 17 42Z"';

  const el = document.createElement("button");
  el.type = "button";
  el.setAttribute(
    "aria-label",
    place.kind === "batting"
      ? `${place.name}, 배팅장`
      : `${place.name}, ${VERDICT_LABEL[place.verdict]}`,
  );
  el.style.cssText = `display:block;padding:0;border:0;background:none;cursor:pointer;filter:drop-shadow(0 2px 3px rgb(36 28 23 / 0.3));`;
  el.innerHTML = `<svg viewBox="0 0 34 44">
    ${head} fill="${fill}" stroke="#fff" stroke-width="2"/>
    ${place.kind === "catchball" ? '<circle cx="17" cy="17" r="10.5" fill="none" stroke="rgb(246 240 230 / 0.6)" stroke-width="0.9" stroke-dasharray="1.6 1.4"/>' : ""}
    <g transform="translate(9 ${place.kind === "batting" ? 7.5 : 9}) scale(0.6667)" style="color:#fff">${glyph(place)}</g>
  </svg>`;
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    onClick();
  });
  setPinSelected(el, selected);
  return el;
}
