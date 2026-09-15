export type UserRole = "admin" | "member";

export type AppUser = {
  email: string;
  role: UserRole;
  name: string;
};

export const USERS: AppUser[] = [
  {
    email: "enrique@hackinghr.io",
    role: "admin",
    name: "Enrique",
  },
  {
    email: "enrique+1@hackinghr.io",
    role: "member",
    name: "Enrique (limited)",
  },
];

const SHARED_PASSWORD =
  process.env.AUTH_ALLOWED_PASSWORD ?? "123456789-10";

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function findUser(email: string): AppUser | undefined {
  const normalized = normalizeEmail(email);
  return USERS.find((user) => user.email === normalized);
}

export function isKnownUser(email: string): boolean {
  return Boolean(findUser(email));
}

export function isAdmin(email: string): boolean {
  return findUser(email)?.role === "admin";
}

export function passwordsMatch(password: string): boolean {
  return safeEqual(password, SHARED_PASSWORD);
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
