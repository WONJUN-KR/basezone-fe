import type { Metadata } from "next";
import Link from "next/link";

import { LEGAL_DOCS } from "@/lib/legal";

export const metadata: Metadata = { title: "약관 · 정책" };

export default function LegalIndexPage() {
  return (
    <main className="min-h-dvh bg-bg-surface px-[var(--space-20)] pt-[calc(env(safe-area-inset-top)+var(--space-24))]">
      <div className="mx-auto max-w-[720px]">
        <h1 className="type-title-22">약관 · 정책</h1>
        <ul className="mt-[var(--space-16)] flex flex-col">
          {LEGAL_DOCS.map(({ slug, title }) => (
            <li key={slug} className="border-b border-border-subtle">
              <Link
                href={`/legal/${slug}/`}
                className="type-body-16 block py-[var(--space-16)]"
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
