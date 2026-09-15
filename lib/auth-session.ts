import {
  DEFAULT_AFTER_AUTH,
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth-constants";
import { isKnownUser, normalizeEmail } from "@/lib/users";

export {
  DEFAULT_AFTER_AUTH,
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
};

export { isKnownUser as isAllowedEmail, normalizeEmail, passwordsMatch } from "@/lib/users";

const AUTH_SECRET =
  process.env.AUTH_SECRET ?? "halstead-local-preview-secret";

export type Session = {
  email: string;
  exp: number;
};

export function safeRedirectPath(value: unknown): string {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return DEFAULT_AFTER_AUTH;
  }
  return value;
}

export async function signSession(session: Session): Promise<string> {
  const payload = toBase64Url(JSON.stringify(session));
  const signature = await hmacSign(payload);
  return `${payload}.${signature}`;
}

export async function verifySessionToken(
  token: string | undefined,
): Promise<Session | null> {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = await hmacSign(payload);
  if (!safeEqual(signature, expected)) return null;

  try {
    const session = JSON.parse(fromBase64Url(payload)) as Session;
    if (!session.email || !isKnownUser(session.email)) return null;
    if (typeof session.exp !== "number" || session.exp < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

export async function createSessionCookieValue(email: string): Promise<string> {
  return signSession({
    email: normalizeEmail(email),
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  });
}

function safeEqual(a: string, b: string): boolean {
  const aBytes = new TextEncoder().encode(a);
  const bBytes = new TextEncoder().encode(b);
  const max = Math.max(aBytes.length, bBytes.length);
  let mismatch = aBytes.length === bBytes.length ? 0 : 1;
  for (let i = 0; i < max; i++) {
    mismatch |= (aBytes[i] ?? 0) ^ (bBytes[i] ?? 0);
  }
  return mismatch === 0;
}

async function hmacSign(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(AUTH_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );
  return toBase64Url(String.fromCharCode(...new Uint8Array(signature)));
}

function toBase64Url(value: string): string {
  const encoded =
    typeof Buffer !== "undefined"
      ? Buffer.from(value, "binary").toString("base64")
      : btoa(value);
  return encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string): string {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const raw = padded + pad;
  return typeof Buffer !== "undefined"
    ? Buffer.from(raw, "base64").toString("binary")
    : atob(raw);
}
