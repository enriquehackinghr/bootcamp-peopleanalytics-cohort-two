import { NextResponse } from "next/server";
import {
  applySessionCookie,
  isAllowedEmail,
  passwordsMatch,
  safeRedirectPath,
} from "@/lib/auth";

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "");
  const password = String(form.get("password") ?? "");
  const next = safeRedirectPath(form.get("next"));
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", next);

  if (!email || !password) {
    loginUrl.searchParams.set("error", "Enter your email and password.");
    return NextResponse.redirect(loginUrl, 303);
  }

  if (!isAllowedEmail(email) || !passwordsMatch(password)) {
    loginUrl.searchParams.set("error", "Invalid email or password.");
    return NextResponse.redirect(loginUrl, 303);
  }

  const response = NextResponse.redirect(new URL(next, request.url), 303);
  await applySessionCookie(response, email);
  return response;
}
