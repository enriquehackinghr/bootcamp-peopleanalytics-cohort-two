import { redirect } from "next/navigation";
import { AuthScreen } from "@/components/AuthScreen";
import { getSession, safeRedirectPath } from "@/lib/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const next = safeRedirectPath(params.next);
  const session = await getSession();

  if (session) {
    redirect(next);
  }

  return <AuthScreen mode="login" next={next} error={params.error} />;
}
