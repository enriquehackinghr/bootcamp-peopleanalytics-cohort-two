import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { isPermissionId, type PermissionId } from "@/lib/permissions";
import { setUserPermissions } from "@/lib/permission-store";
import { isAdmin } from "@/lib/users";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !isAdmin(session.email)) {
    return NextResponse.redirect(new URL("/app/dashboard", request.url), 303);
  }

  const form = await request.formData();
  const email = String(form.get("email") ?? "");
  const permissions = form
    .getAll("permissions")
    .map(String)
    .filter(isPermissionId) as PermissionId[];

  const adminUrl = new URL("/app/admin", request.url);

  try {
    await setUserPermissions(email, permissions);
    adminUrl.searchParams.set("saved", email);
  } catch (error) {
    adminUrl.searchParams.set(
      "error",
      error instanceof Error ? error.message : "Unable to save permissions.",
    );
  }

  return NextResponse.redirect(adminUrl, 303);
}
