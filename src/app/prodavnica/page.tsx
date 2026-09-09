import Link from 'next/link';
import { ProductCard } from '@/components/shop/ProductCard';
import { getCategories, getProducts } from '@/lib/api';
import { formatRsd } from '@/lib/format';

type SearchParams = Promise<{
  category?: string;
  q?: string;
  minPrice?: string;
  maxPrice?: string;
}>;

export default async function ProdavnicaPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;

  let products: Awaited<ReturnType<typeof getProducts>> = [];
  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  let error: string | null = null;

  try {
    [products, categories] = await Promise.all([
      getProducts({
        category: params.category,
        q: params.q,
        minPrice,
        maxPrice,
      }),
      getCategories(),
    ]);
  } catch {
    error =
      'Prodavnica trenutno nije dostupna. Pokrenite API (server) i PostgreSQL.';
  }

  const buildHref = (next: Record<string, string | undefined>) => {
    const merged = {
      category: params.category,
      q: params.q,
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      ...next,
    };
    const search = new URLSearchParams();
    Object.entries(merged).forEach(([key, value]) => {
      if (value) search.set(key, value);
    });
    const qs = search.toString();
    return `/prodavnica${qs ? `?${qs}` : ''}`;
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-forest)]">
        Prodavnica
      </h1>
      <p className="mt-2 text-[var(--color-ink)]/70">
        Organski proizvodi sa imanja Zladovce — izaberite kategoriju ili
        pretražite.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-sm bg-white/50 p-5 lg:sticky lg:top-24">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-wider">
              Filteri
            </p>
            <Link href="/prodavnica" className="text-xs text-[var(--color-berry)] underline">
              Resetuj
            </Link>
          </div>

          <form className="mb-6">
            <label className="mb-1 block text-sm font-medium" htmlFor="q">
              Pretraga
            </label>
            <input
              id="q"
              name="q"
              defaultValue={params.q ?? ''}
              placeholder="npr. borovnica"
              className="w-full rounded-sm border border-[var(--color-forest)]/15 bg-[var(--color-cream)] px-3 py-2 text-sm"
            />
            {params.category && (
              <input type="hidden" name="category" value={params.category} />
            )}
            {params.minPrice && (
              <input type="hidden" name="minPrice" value={params.minPrice} />
            )}
            {params.maxPrice && (
              <input type="hidden" name="maxPrice" value={params.maxPrice} />
            )}
            <button
              type="submit"
              className="mt-2 w-full rounded-sm bg-[var(--color-forest)] px-3 py-2 text-sm text-[var(--color-cream)]"
            >
              Traži
            </button>
          </form>

          <p className="mb-3 text-sm font-medium">Kategorije</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href={buildHref({ category: undefined })}
                className={!params.category ? 'font-semibold text-[var(--color-berry)]' : 'text-[var(--color-ink)]/70'}
              >
                Svi proizvodi
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={buildHref({ category: c.slug })}
                  className={
                    params.category === c.slug
                      ? 'font-semibold text-[var(--color-berry)]'
                      : 'text-[var(--color-ink)]/70'
                  }
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mb-3 mt-6 text-sm font-medium">Cena (RSD)</p>
          <form className="space-y-3 text-sm">
            {params.category && (
              <input type="hidden" name="category" value={params.category} />
            )}
            {params.q && <input type="hidden" name="q" value={params.q} />}
            <label className="block">
              <span className="mb-1 block text-xs opacity-70">Od</span>
              <input
                name="minPrice"
                type="number"
                min={0}
                defaultValue={params.minPrice ?? ''}
                className="w-full rounded-sm border border-[var(--color-forest)]/15 bg-[var(--color-cream)] px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs opacity-70">Do</span>
              <input
                name="maxPrice"
                type="number"
                min={0}
                defaultValue={params.maxPrice ?? ''}
                className="w-full rounded-sm border border-[var(--color-forest)]/15 bg-[var(--color-cream)] px-3 py-2"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-sm px-3 py-2 text-sm ring-1 ring-[var(--color-forest)]/25"
            >
              Primeni cenu
            </button>
          </form>
        </aside>

        <div>
          {error ? (
            <p className="rounded-sm border border-[var(--color-terracotta)]/40 bg-white/50 px-4 py-3 text-sm">
              {error}
            </p>
          ) : (
            <>
              <p className="mb-5 text-sm text-[var(--color-ink)]/60">
                {products.length}{' '}
                {products.length === 1 ? 'proizvod' : 'proizvoda'}
                {params.minPrice || params.maxPrice
                  ? ` · ${params.minPrice ? formatRsd(Number(params.minPrice)) : '…'} – ${params.maxPrice ? formatRsd(Number(params.maxPrice)) : '…'}`
                  : ''}
              </p>
              {products.length === 0 ? (
                <div className="rounded-sm border border-dashed border-[var(--color-forest)]/20 bg-white/40 p-10 text-center text-sm text-[var(--color-ink)]/60">
                  Nema proizvoda za izabrane filtere.
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
