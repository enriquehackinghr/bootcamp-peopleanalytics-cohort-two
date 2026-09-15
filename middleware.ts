import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth-session";

const PROTECTED_PREFIXES = ["/dashboard", "/app", "/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const session = await verifySessionToken(
    request.cookies.get(SESSION_COOKIE)?.value,
  );

  if (session) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/app/:path*", "/admin/:path*"],
};
