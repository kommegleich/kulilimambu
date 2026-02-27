import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 메인(/) 또는 /work/xxx 가 아니면 전부 메인으로 보냄 → 404 안 나오게
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path === "/" || path === "" || path.startsWith("/work/")) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
