'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { createOrder } from '@/lib/api';
import { formatRsd } from '@/lib/format';
import { useCartStore } from '@/store/cart';

export default function KasaPage() {
  const items = useCartStore((s) => s.items);
  const totalAmount = useCartStore((s) => s.totalAmount);
  const clearCart = useCartStore((s) => s.clearCart);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState<number | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (items.length === 0) {
      setError('Korpa je prazna.');
      return;
    }

    const form = new FormData(event.currentTarget);
    setSubmitting(true);
    setError(null);

    try {
      const order = await createOrder({
        customerName: String(form.get('customerName') ?? ''),
        phone: String(form.get('phone') ?? ''),
        email: String(form.get('email') ?? ''),
        address: String(form.get('address') ?? ''),
        notes: String(form.get('notes') ?? '') || undefined,
        items: items.map((i) => ({
          productId: i.product.id,
          quantity: i.quantity,
        })),
      });
      clearCart();
      setSuccessOrderId(order.id);
    } catch (err) {
      setError(await parseApiError(err));
    } finally {
      setSubmitting(false);
    }
  }

  if (successOrderId != null) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-sm bg-white/60 p-8 text-center">
          <p className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-forest)]">
            Hvala na porudžbini!
          </p>
          <p className="mt-3 text-sm text-[var(--color-ink)]/75">
            Vaša porudžbina #<strong>{successOrderId}</strong> je primljena.
            Plaćanje: <strong>Pouzećem</strong>.
          </p>
          <p className="mt-2 text-sm text-[var(--color-ink)]/60">
            Javićemo vam se uskoro radi potvrde dostave.
          </p>
          <Link
            href="/prodavnica"
            className="mt-8 inline-flex rounded-sm bg-[var(--color-forest)] px-5 py-3 text-sm text-[var(--color-cream)]"
          >
            Nazad u prodavnicu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-forest)]">
        Kasa
      </h1>
      <p className="mt-2 text-sm text-[var(--color-ink)]/70">
        Plaćanje pouzećem. Popunite podatke za dostavu u Srbiji.
      </p>

      {items.length === 0 ? (
        <div className="mt-8 rounded-sm border border-dashed border-[var(--color-forest)]/20 bg-white/40 p-10 text-center">
          <p className="text-sm text-[var(--color-ink)]/70">
            Korpa je prazna — dodajte proizvode pre kasiranja.
          </p>
          <Link
            href="/prodavnica"
            className="mt-6 inline-flex rounded-sm px-5 py-2.5 text-sm font-semibold ring-1 ring-[var(--color-forest)]/25"
          >
            Idi u prodavnicu
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-8 rounded-sm bg-white/50 p-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider">
              Pregled
            </p>
            <ul className="space-y-2 text-sm text-[var(--color-ink)]/80">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex justify-between gap-3">
                  <span>
                    {product.name} × {quantity}
                  </span>
                  <span className="font-medium text-[var(--color-forest)]">
                    {formatRsd(product.price * quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between border-t border-[var(--color-forest)]/10 pt-3 text-base font-semibold">
              <span>Ukupno</span>
              <span>{formatRsd(totalAmount())}</span>
            </div>
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-sm bg-white/50 p-6">
            <Field name="customerName" label="Ime i prezime" placeholder="Petar Petrović" required />
            <Field name="address" label="Adresa" placeholder="Ulica i broj, grad" required />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="phone" label="Telefon" placeholder="+381..." required />
              <Field name="email" label="Email" type="email" placeholder="vas@email.rs" required />
            </div>
            <label className="block text-sm">
              <span className="mb-1 block font-medium">Napomena</span>
              <textarea
                name="notes"
                rows={3}
                placeholder="npr. dostava posle 17h"
                className="w-full rounded-sm border border-[var(--color-forest)]/15 bg-[var(--color-cream)] px-3 py-2"
              />
            </label>
            <p className="text-xs text-[var(--color-ink)]/60">
              Način plaćanja: <strong>Pouzećem</strong>
            </p>
            {error && (
              <p className="rounded-sm bg-[var(--color-berry)]/10 px-3 py-2 text-sm text-[var(--color-berry)]">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-sm bg-[var(--color-terracotta)] px-4 py-3 text-sm font-medium text-white disabled:opacity-50"
            >
              {submitting ? 'Slanje...' : 'Pošalji porudžbinu'}
            </button>
          </form>
        </>
      )}
    </main>
  );
}

function Field({
  name,
  label,
  type = 'text',
  required,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-sm border border-[var(--color-forest)]/15 bg-[var(--color-cream)] px-3 py-2"
      />
    </label>
  );
}

async function parseApiError(err: unknown): Promise<string> {
  if (!(err instanceof Error)) return 'Greška pri porudžbini.';
  try {
    const parsed = JSON.parse(err.message) as { message?: string | string[] };
    if (Array.isArray(parsed.message)) return parsed.message.join(' ');
    if (typeof parsed.message === 'string') return parsed.message;
  } catch {
    /* plain text */
  }
  return err.message || 'Greška pri porudžbini.';
}
