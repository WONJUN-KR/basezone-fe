import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LEGAL_DOCS, type LegalSlug, loadLegalDoc } from "@/lib/legal";

// 정적 export: 목록에 있는 문서만 빌드, 그 밖의 주소는 404
export const dynamicParams = false;

export function generateStaticParams() {
  return LEGAL_DOCS.map(({ slug }) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

function findDoc(slug: string) {
  return LEGAL_DOCS.find((d) => d.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = findDoc((await params).slug);
  return { title: doc?.title };
}

export default async function LegalDocPage({ params }: Props) {
  const doc = findDoc((await params).slug);
  if (!doc) notFound();
  const blocks = await loadLegalDoc(doc.slug as LegalSlug);

  return (
    <main className="min-h-dvh bg-bg-surface px-[var(--space-20)] pt-[calc(env(safe-area-inset-top)+var(--space-16))] pb-[calc(env(safe-area-inset-bottom)+var(--space-40))]">
      <div className="mx-auto max-w-[720px]">
        <Link href="/legal/" className="type-label-13 text-text-secondary">
          약관 · 정책
        </Link>
        <article className="mt-[var(--space-12)] flex flex-col gap-[var(--space-12)]">
          {blocks.map((b, i) => {
            switch (b.type) {
              case "h1":
                return (
                  <h1 key={i} className="type-title-22">
                    {b.text}
                  </h1>
                );
              case "h2":
                return (
                  <h2 key={i} className="type-heading-16 mt-[var(--space-12)]">
                    {b.text}
                  </h2>
                );
              case "note":
                return (
                  <p key={i} className="type-caption-13 text-text-secondary">
                    {b.text}
                  </p>
                );
              case "list":
                return (
                  <ul
                    key={i}
                    className="type-body-15 flex list-disc flex-col gap-[var(--space-6)] pl-[var(--space-20)]"
                  >
                    {b.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                );
              default:
                return (
                  <p key={i} className="type-body-15">
                    {b.text}
                  </p>
                );
            }
          })}
        </article>
      </div>
    </main>
  );
}
