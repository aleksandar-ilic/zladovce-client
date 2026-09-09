export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-forest)]/10 bg-[var(--color-forest)] text-[var(--color-cream)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-10 text-sm md:flex-row md:items-center md:justify-between">
        <p className="font-[family-name:var(--font-display)] text-lg">Zladovce</p>
        <p className="opacity-80">
          100% organski proizvodi iz Zladovca · Balčinci mahala
        </p>
      </div>
    </footer>
  );
}
