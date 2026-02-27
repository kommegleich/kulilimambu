"use client";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="mx-auto max-w-[1400px] px-6 py-10 pb-14 md:px-10">
        <section id="contact" className="mb-10">
          <h2 className="section-label mb-3">Contact</h2>
          <p className="m-0">
            <a
              href="mailto:your@email.com"
              className="text-[var(--color-text)] no-underline hover:opacity-70"
            >
              your@email.com
            </a>
            {/* 인스타/비헨스 등: <a href="https://instagram.com/yourid" className="ml-4">Instagram</a> */}
          </p>
        </section>
        <button
          type="button"
          className="cursor-pointer border-0 bg-transparent p-0 text-xs font-medium uppercase tracking-[0.15em] text-[var(--color-muted)] hover:text-[var(--color-text)]"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑ Back to Top
        </button>
      </div>
    </footer>
  );
}
