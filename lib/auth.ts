import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionCookieValue,
  verifySessionToken,
  type Session,
} from "@/lib/auth-session";

export {
  DEFAULT_AFTER_AUTH,
  SESSION_COOKIE,
  isAllowedEmail,
  passwordsMatch,
  safeRedirectPath,
} from "@/lib/auth-session";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_MAX_AGE_SECONDS,
};

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

export async function applySessionCookie(
  response: NextResponse,
  email: string,
): Promise<void> {
  response.cookies.set(
    SESSION_COOKIE,
    await createSessionCookieValue(email),
    cookieOptions,
  );
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set(SESSION_COOKIE, "", {
    ...cookieOptions,
    maxAge: 0,
  });
}
