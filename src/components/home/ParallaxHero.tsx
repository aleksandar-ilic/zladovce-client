import Link from 'next/link';

export function ParallaxHero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80')",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[rgba(28,45,34,0.35)] via-[rgba(28,45,34,0.55)] to-[rgba(28,45,34,0.82)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 py-32 text-center text-[var(--color-cream)]">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-[var(--color-cream)]/80">
          Porodično imanje · Zladovce
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-5xl font-semibold leading-tight md:text-7xl">
          Zladovce
        </h1>
        <p className="mt-4 font-[family-name:var(--font-display)] text-2xl italic text-[var(--color-cream)]/90 md:text-3xl">
          Ukus netaknute prirode
        </p>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--color-cream)]/80">
          Organski džemovi, sokovi i sveže bobice — rukom pripremljeni recepti
          naše majke, sa južne Srbije do vašeg stola.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/prodavnica"
            className="inline-flex rounded-sm bg-[var(--color-terracotta)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Kupi odmah
          </Link>
          <Link
            href="/#o-nama"
            className="inline-flex rounded-sm px-5 py-2.5 text-sm font-semibold tracking-wide text-[var(--color-cream)] ring-1 ring-[var(--color-cream)]/40 transition hover:bg-[var(--color-cream)]/10"
          >
            Saznaj više
          </Link>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[var(--color-cream)]/70"
        aria-hidden
      >
        <span className="block animate-bounce text-xs uppercase tracking-widest">
          Skroluj
        </span>
      </div>
    </section>
  );
}
