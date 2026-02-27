import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="mx-auto max-w-[1400px] px-6 py-8 md:px-10">
        <nav className="mb-5 flex justify-center gap-6">
          <Link
            href="#work"
            className="text-[13px] font-medium uppercase tracking-[0.2em] text-[var(--color-text)] no-underline hover:opacity-70"
          >
            Work
          </Link>
          <Link
            href="#contact"
            className="text-[13px] font-medium uppercase tracking-[0.2em] text-[var(--color-text)] no-underline hover:opacity-70"
          >
            Contact
          </Link>
        </nav>
        <h1 className="m-0 text-2xl font-normal tracking-tight md:text-3xl">
          kulilimambu
        </h1>
      </div>
    </header>
  );
}
