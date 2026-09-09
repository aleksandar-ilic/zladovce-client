'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cart';

export function CartButtonClient() {
  const openCart = useCartStore((s) => s.openCart);
  const count = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <button
      type="button"
      onClick={openCart}
      className="relative rounded-sm bg-[var(--color-forest)] px-3 py-1.5 text-sm text-[var(--color-cream)] transition hover:brightness-110"
    >
      Korpa
      {ready && count > 0 && (
        <span className="ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-[var(--color-berry)] px-1.5 text-xs">
          {count}
        </span>
      )}
    </button>
  );
}
