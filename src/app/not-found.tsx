import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-forest)]">
        Stranica nije pronađena
      </h1>
      <p className="mt-3 text-sm text-[var(--color-ink)]/70">
        Traženi proizvod ili stranica ne postoji.
      </p>
      <Link
        href="/prodavnica"
        className="mt-8 inline-flex rounded-sm bg-[var(--color-forest)] px-5 py-3 text-sm text-[var(--color-cream)]"
      >
        Nazad u prodavnicu
      </Link>
    </main>
  );
}
