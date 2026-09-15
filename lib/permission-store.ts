import { promises as fs } from "fs";
import path from "path";
import {
  PERMISSION_IDS,
  isPermissionId,
  type PermissionId,
} from "@/lib/permissions";
import { USERS, isAdmin, normalizeEmail } from "@/lib/users";

export type PermissionStore = Record<string, PermissionId[]>;

const STORE_PATH = path.join(process.cwd(), "data", "permissions.json");

function emptyStore(): PermissionStore {
  return Object.fromEntries(
    USERS.map((user) => [user.email, [] as PermissionId[]]),
  );
}

function sanitizeStore(raw: unknown): PermissionStore {
  const next = emptyStore();
  if (!raw || typeof raw !== "object") return next;

  for (const [email, value] of Object.entries(raw as Record<string, unknown>)) {
    const normalized = normalizeEmail(email);
    if (!USERS.some((user) => user.email === normalized)) continue;
    if (!Array.isArray(value)) continue;
    next[normalized] = value.filter(isPermissionId);
  }

  return next;
}

export async function readPermissionStore(): Promise<PermissionStore> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    return sanitizeStore(JSON.parse(raw));
  } catch {
    return emptyStore();
  }
}

export async function writePermissionStore(
  store: PermissionStore,
): Promise<void> {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

export async function getAssignedPermissions(
  email: string,
): Promise<PermissionId[]> {
  const store = await readPermissionStore();
  return store[normalizeEmail(email)] ?? [];
}

export async function getEffectivePermissions(
  email: string,
): Promise<Set<PermissionId>> {
  if (isAdmin(email)) {
    return new Set(PERMISSION_IDS);
  }
  return new Set(await getAssignedPermissions(email));
}

export async function setUserPermissions(
  email: string,
  permissions: PermissionId[],
): Promise<PermissionStore> {
  const normalized = normalizeEmail(email);
  if (!USERS.some((user) => user.email === normalized)) {
    throw new Error("Unknown user.");
  }
  if (isAdmin(normalized)) {
    throw new Error("Administrator access cannot be edited.");
  }

  const store = await readPermissionStore();
  store[normalized] = PERMISSION_IDS.filter((id) => permissions.includes(id));
  await writePermissionStore(store);
  return store;
}
