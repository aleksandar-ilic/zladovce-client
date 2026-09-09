import Image from 'next/image';
import Link from 'next/link';
import { ParallaxHero } from '@/components/home/ParallaxHero';
import { ProductCard } from '@/components/shop/ProductCard';
import { getProducts } from '@/lib/api';

export default async function HomePage() {
  let featured: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    featured = await getProducts({ featured: true });
  } catch {
    featured = [];
  }

  return (
    <main>
      <ParallaxHero />

      <section
        id="o-nama"
        className="relative overflow-hidden px-5 py-24 lg:px-8"
      >
        <div className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-[var(--color-forest)]/5 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="relative min-h-[320px] overflow-hidden rounded-sm shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80"
              alt="Voćnjak na porodičnom imanju"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-forest)] md:text-4xl">
              O nama
            </h2>
            <p className="mt-2 text-sm text-[var(--color-ink)]/70">
              Iz Balčinaca mahale u Zladovcu — mesto gde se tradicija i priroda
              spajaju u svakoj tegli.
            </p>
            <p className="mt-6 text-base leading-relaxed text-[var(--color-ink)]/85">
              Zladovce je porodično imanje posvećeno 100% organskoj proizvodnji.
              Naša majka čuva stare recepte i sa pažnjom priprema džemove, sokove
              i kompote od borovnice, kupine i maline. Svaki proizvod nosi ukus
              planine i iskrenost kućne radinosti.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-forest)]/10 bg-[var(--color-cream-dark)]/40 px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-forest)] md:text-4xl">
            Istaknuti proizvodi
          </h2>
          <p className="mt-2 text-sm text-[var(--color-ink)]/70">
            Naši bestseleri — spremni za vašu korpu.
          </p>

          {featured.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-sm text-[var(--color-ink)]/70">
              Istaknuti proizvodi će se pojaviti kada API bude dostupan.
            </p>
          )}

          <div className="mt-10 text-center">
            <Link
              href="/prodavnica"
              className="inline-flex rounded-sm px-5 py-2.5 text-sm font-semibold text-[var(--color-forest)] ring-1 ring-[var(--color-forest)]/25 transition hover:bg-white/50"
            >
              Pogledaj celu prodavnicu
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
