'use client';

import { useCartStore } from '@/store/cart';
import type { Product } from '@/types';

type Props = {
  product: Product;
  quantity?: number;
  className?: string;
  label?: string;
};

export function AddToCartButton({
  product,
  quantity = 1,
  className,
  label = 'U korpu',
}: Props) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <button
      type="button"
      onClick={() => addItem(product, quantity)}
      className={
        className ??
        'rounded-sm bg-[var(--color-forest)] px-4 py-2 text-sm font-medium text-[var(--color-cream)] transition hover:brightness-110'
      }
    >
      {label}
    </button>
  );
}
