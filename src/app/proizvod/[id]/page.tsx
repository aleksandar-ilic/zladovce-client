import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ProductPurchasePanel } from '@/components/cart/ProductPurchasePanel';
import { getProduct } from '@/lib/api';
import { formatRsd } from '@/lib/format';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await getProduct(Number(id));
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
    return {
      title: `${product.name} | Zladovce`,
      description: product.description,
      openGraph: {
        title: `${product.name} · Zladovce`,
        description: `${product.description} · ${formatRsd(product.price)}`,
        images: [{ url: product.imageUrl }],
        url: `${siteUrl}/proizvod/${product.id}`,
        type: 'website',
        locale: 'sr_RS',
        siteName: 'Zladovce',
      },
    };
  } catch {
    return { title: 'Proizvod | Zladovce' };
  }
}

export default async function ProizvodPage({ params }: Props) {
  const { id } = await params;
  let product;
  try {
    product = await getProduct(Number(id));
  } catch {
    notFound();
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[var(--color-cream-dark)]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-[var(--color-terracotta)]">
          {product.category}
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[var(--color-forest)]">
          {product.name}
        </h1>
        <p className="mt-4 text-2xl font-medium">{formatRsd(product.price)}</p>
        <p className="mt-6 leading-relaxed text-[var(--color-ink)]/85">
          {product.description}
        </p>
        <ProductPurchasePanel product={product} />
      </div>
    </main>
  );
}
