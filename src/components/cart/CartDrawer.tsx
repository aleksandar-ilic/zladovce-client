'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { formatRsd } from '@/lib/format';

export function CartDrawer() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const removeItem = useCartStore((s) => s.removeItem);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const totalAmount = useCartStore((s) => s.totalAmount);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Zatvori korpu"
        onClick={closeCart}
      />
      <aside className="relative flex h-full w-full max-w-md flex-col bg-[var(--color-cream)] shadow-xl">
        <div className="flex items-center justify-between border-b border-[var(--color-forest)]/10 px-5 py-4">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-forest)]">
            Korpa
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="text-sm underline"
          >
            Zatvori
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="text-sm text-[var(--color-ink)]/70">Korpa je prazna.</p>
          ) : (
            <ul className="space-y-5">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex flex-col gap-2 border-b border-[var(--color-forest)]/10 pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/proizvod/${product.id}`}
                        onClick={closeCart}
                        className="font-medium hover:text-[var(--color-berry)]"
                      >
                        {product.name}
                      </Link>
                      <p className="text-sm opacity-70">{formatRsd(product.price)}</p>
                    </div>
                    <button
                      type="button"
                      className="text-xs text-[var(--color-berry)] underline"
                      onClick={() => removeItem(product.id)}
                    >
                      Ukloni
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="h-8 w-8 rounded-sm border border-[var(--color-forest)]/20"
                        onClick={() => setQuantity(product.id, quantity - 1)}
                        aria-label="Smanji količinu"
                      >
                        −
                      </button>
                      <span className="min-w-6 text-center text-sm">{quantity}</span>
                      <button
                        type="button"
                        className="h-8 w-8 rounded-sm border border-[var(--color-forest)]/20"
                        onClick={() => setQuantity(product.id, quantity + 1)}
                        aria-label="Povećaj količinu"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm font-medium">
                      {formatRsd(product.price * quantity)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-[var(--color-forest)]/10 px-5 py-4">
          <p className="mb-3 text-sm">
            Ukupno: <strong>{formatRsd(totalAmount())}</strong>
          </p>
          <Link
            href="/kasa"
            onClick={closeCart}
            className="flex w-full items-center justify-center rounded-sm bg-[var(--color-forest)] px-4 py-3 text-sm text-[var(--color-cream)]"
          >
            Idi na kasu
          </Link>
        </div>
      </aside>
    </div>
  );
}
