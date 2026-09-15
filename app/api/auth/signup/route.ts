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
  const confirmPassword = String(form.get("confirmPassword") ?? "");
  const next = safeRedirectPath(form.get("next"));
  const signupUrl = new URL("/signup", request.url);
  signupUrl.searchParams.set("next", next);

  if (!email || !password || !confirmPassword) {
    signupUrl.searchParams.set("error", "Fill in every field to create an account.");
    return NextResponse.redirect(signupUrl, 303);
  }

  if (password !== confirmPassword) {
    signupUrl.searchParams.set("error", "Passwords do not match.");
    return NextResponse.redirect(signupUrl, 303);
  }

  if (!isAllowedEmail(email)) {
    signupUrl.searchParams.set(
      "error",
      "This portal is invite-only. Ask an administrator for access.",
    );
    return NextResponse.redirect(signupUrl, 303);
  }

  if (!passwordsMatch(password)) {
    signupUrl.searchParams.set(
      "error",
      "That password is not valid for this invited account.",
    );
    return NextResponse.redirect(signupUrl, 303);
  }

  const response = NextResponse.redirect(new URL(next, request.url), 303);
  await applySessionCookie(response, email);
  return response;
}
