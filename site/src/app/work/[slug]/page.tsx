import Link from "next/link";
import { WORKS } from "@/data/works";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type Props = { params: Promise<{ slug: string }> };

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const work = WORKS.find((w) => w.id === slug || w.href === `/work/${slug}`);

  if (!work) {
    return (
      <>
        <Header />
        <main className="work-section">
          <p>작품을 찾을 수 없습니다.</p>
          <Link href="/" className="text-[var(--color-text)] underline">
            홈으로
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="work-section">
        <Link
          href="/#work"
          className="section-label mb-6 inline-block no-underline hover:opacity-70"
        >
          ← Work
        </Link>
        <h2 className="mb-8 mt-0 text-2xl font-normal">
          {work.title ?? work.alt}
        </h2>
        <div className="max-w-4xl">
          {work.type === "image" ? (
            <img
              src={work.src}
              alt={work.alt}
              className="w-full rounded-sm"
            />
          ) : (
            <video
              src={work.src}
              controls
              className="w-full rounded-sm"
              aria-label={work.alt}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
