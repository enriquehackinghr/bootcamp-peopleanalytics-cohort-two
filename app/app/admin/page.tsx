import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/AdminDashboard";
import { getSession } from "@/lib/auth";
import { readPermissionStore } from "@/lib/permission-store";
import { isAdmin } from "@/lib/users";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login?next=/app/admin");
  }
  if (!isAdmin(session.email)) {
    redirect("/app/dashboard");
  }

  const params = await searchParams;
  const store = await readPermissionStore();

  return (
    <AdminDashboard
      store={store}
      savedEmail={params.saved}
      error={params.error}
    />
  );
}
