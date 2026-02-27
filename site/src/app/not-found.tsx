import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[var(--color-bg)] px-6 text-center">
      <h1 className="text-2xl font-medium">페이지를 찾을 수 없습니다</h1>
      <p className="text-[var(--color-muted)]">
        주소창에 <strong>http://localhost:3000</strong> 만 입력하고, Cursor 미리보기 대신 <strong>Chrome/Safari</strong>를 사용해 보세요.
      </p>
      <Link
        href="/"
        className="rounded bg-[var(--color-text)] px-6 py-3 text-[var(--color-bg)] no-underline hover:opacity-90"
      >
        홈으로 가기
      </Link>
    </div>
  );
}
