'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import type { Product } from '@/types';
import { AddToCartButton } from './AddToCartButton';

type Props = {
  product: Product;
};

export function ProductPurchasePanel({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const openCart = useCartStore((s) => s.openCart);

  return (
    <div className="mt-8 space-y-4">
      <label className="flex items-center gap-3 text-sm">
        <span>Količina</span>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
          className="w-20 rounded-sm border border-[var(--color-forest)]/20 bg-white px-3 py-2"
        />
      </label>
      <div className="flex flex-wrap gap-3">
        <AddToCartButton
          product={product}
          quantity={quantity}
          label="Dodaj u korpu"
          className="rounded-sm bg-[var(--color-terracotta)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        />
        <button
          type="button"
          onClick={openCart}
          className="rounded-sm px-5 py-3 text-sm font-medium text-[var(--color-forest)] ring-1 ring-[var(--color-forest)]/25 transition hover:bg-white/60"
        >
          Pogledaj korpu
        </button>
      </div>
      <p className="text-xs text-[var(--color-ink)]/60">
        Plaćanje: <strong>Pouzećem</strong>
      </p>
    </div>
  );
}
