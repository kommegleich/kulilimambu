import Link from "next/link";
import { WORKS } from "@/data/works";

export function WorkGrid() {
  return (
    <>
      <h2 className="section-label mb-8 mt-0">Work</h2>
      <div
        className="grid gap-4 md:gap-5"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
      >
        {WORKS.map((work) => (
          <Link
            key={work.id}
            href={work.href}
            className="grid-item block aspect-square overflow-hidden bg-[var(--color-border)]"
          >
            {work.type === "image" ? (
              <img
                src={work.src}
                alt={work.alt}
                className="grid-item-media"
                loading="lazy"
              />
            ) : (
              <video
                autoPlay
                muted
                loop
                playsInline
                src={work.src}
                aria-label={work.alt}
                className="grid-item-media"
              />
            )}
          </Link>
        ))}
      </div>
    </>
  );
}
