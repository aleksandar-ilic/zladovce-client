import Link from 'next/link';
import { CartButtonClient } from './CartButtonClient';

const links = [
  { href: '/', label: 'Početna' },
  { href: '/prodavnica', label: 'Prodavnica' },
  { href: '/#o-nama', label: 'O nama' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-forest)]/10 bg-[var(--color-cream)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-[var(--color-forest)]"
        >
          Zladovce
        </Link>
        <nav className="flex items-center gap-4 text-sm text-[var(--color-ink)] sm:gap-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-[var(--color-berry)]"
            >
              {link.label}
            </Link>
          ))}
          <CartButtonClient />
        </nav>
      </div>
    </header>
  );
}
