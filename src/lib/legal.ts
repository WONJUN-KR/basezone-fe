import { readFile } from "node:fs/promises";
import path from "node:path";

import { APP_NAME } from "@/lib/app";

// 원문은 src/content/legal/*.md (디자인 레포 '약관 · 정책' 판과 같은 문구)
// 앱 이름은 {{APP_NAME}} 자리에 환경 변수로 채움(없으면 다른 빈칸처럼 "[앱 이름]")
// 빌드할 때 읽어서 정적 페이지로 만듦 -> 앱 · 웹 · 스토어 제출용 주소 모두 같은 문서
export const LEGAL_DOCS = [
  { slug: "terms", title: "서비스 이용약관" },
  { slug: "privacy", title: "개인정보 처리방침" },
  { slug: "location", title: "위치기반서비스 이용약관" },
  { slug: "community", title: "커뮤니티 가이드라인" },
  { slug: "notifications", title: "알림 수신 동의" },
] as const;

export type LegalSlug = (typeof LEGAL_DOCS)[number]["slug"];

export type LegalBlock =
  | { type: "h1" | "h2" | "note" | "p"; text: string }
  | { type: "list"; items: string[] };

const CONTENT_DIR = path.join(process.cwd(), "src/content/legal");

export async function loadLegalDoc(slug: LegalSlug): Promise<LegalBlock[]> {
  const raw = await readFile(path.join(CONTENT_DIR, `${slug}.md`), "utf8");
  return parseLegal(raw.replaceAll("{{APP_NAME}}", APP_NAME || "[앱 이름]"));
}

// 원문에서 쓰는 문법만 처리: # 제목, ## 소제목, > 안내, - 목록, 나머지는 문단
function parseLegal(raw: string): LegalBlock[] {
  const blocks: LegalBlock[] = [];
  for (const line of raw.split("\n")) {
    const text = line.trim();
    if (!text) continue;
    if (text.startsWith("- ")) {
      const last = blocks.at(-1);
      if (last?.type === "list") last.items.push(text.slice(2));
      else blocks.push({ type: "list", items: [text.slice(2)] });
    } else if (text.startsWith("## ")) {
      blocks.push({ type: "h2", text: text.slice(3) });
    } else if (text.startsWith("# ")) {
      blocks.push({ type: "h1", text: text.slice(2) });
    } else if (text.startsWith("> ")) {
      blocks.push({ type: "note", text: text.slice(2) });
    } else {
      blocks.push({ type: "p", text });
    }
  }
  return blocks;
}
