'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { formatRsd } from '@/lib/format';

export default function KorpaPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const totalAmount = useCartStore((s) => s.totalAmount);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-forest)]">
        Korpa
      </h1>

      {items.length === 0 ? (
        <p className="mt-6 text-[var(--color-ink)]/70">
          Korpa je prazna.{' '}
          <Link href="/prodavnica" className="underline">
            Idi u prodavnicu
          </Link>
        </p>
      ) : (
        <>
          <ul className="mt-8 space-y-4">
            {items.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="flex flex-col gap-3 border-b border-[var(--color-forest)]/10 pb-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <Link
                    href={`/proizvod/${product.id}`}
                    className="font-medium hover:text-[var(--color-berry)]"
                  >
                    {product.name}
                  </Link>
                  <p className="text-sm opacity-70">{formatRsd(product.price)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="h-8 w-8 rounded-sm border border-[var(--color-forest)]/20"
                      onClick={() => setQuantity(product.id, quantity - 1)}
                    >
                      −
                    </button>
                    <span className="min-w-6 text-center text-sm">{quantity}</span>
                    <button
                      type="button"
                      className="h-8 w-8 rounded-sm border border-[var(--color-forest)]/20"
                      onClick={() => setQuantity(product.id, quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="min-w-24 text-right text-sm font-medium">
                    {formatRsd(product.price * quantity)}
                  </p>
                  <button
                    type="button"
                    className="text-sm text-[var(--color-berry)] underline"
                    onClick={() => removeItem(product.id)}
                  >
                    Ukloni
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            Ukupno: <strong>{formatRsd(totalAmount())}</strong>
          </p>
          <Link
            href="/kasa"
            className="mt-6 inline-flex rounded-sm bg-[var(--color-forest)] px-5 py-3 text-sm text-[var(--color-cream)]"
          >
            Nastavi na kasu
          </Link>
        </>
      )}
    </main>
  );
}
