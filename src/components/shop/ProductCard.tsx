import Image from 'next/image';
import Link from 'next/link';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import type { Product } from '@/types';
import { formatRsd } from '@/lib/format';

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-sm bg-[var(--color-cream)] transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/proizvod/${product.id}`}
        className="relative aspect-[4/5] overflow-hidden bg-[var(--color-cream-dark)]"
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-terracotta)]">
            {product.category}
          </p>
          <Link href={`/proizvod/${product.id}`}>
            <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-forest)] transition hover:text-[var(--color-berry)]">
              {product.name}
            </h3>
          </Link>
        </div>
        <p className="line-clamp-2 flex-1 text-sm text-[var(--color-ink)]/70">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3">
          <p className="text-lg font-semibold text-[var(--color-forest)]">
            {formatRsd(product.price)}
          </p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
