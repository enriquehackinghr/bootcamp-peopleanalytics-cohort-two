import Link from "next/link";
import { getSession } from "@/lib/auth";
import { isAdmin } from "@/lib/users";

export async function AuthControls({
  tone = "landing",
}: {
  tone?: "landing" | "dashboard";
}) {
  const session = await getSession();
  const muted = tone === "landing" ? "text-[#3d5c5c]" : "text-slate-600";
  const button =
    tone === "landing"
      ? "rounded-full border border-[#0d6e6e]/20 px-4 py-2 text-sm font-semibold text-[#084848] transition hover:bg-white"
      : "text-sm font-medium text-[#0d6e6e] hover:text-[#084848]";

  if (session) {
    return (
      <div className="flex items-center gap-3">
        {isAdmin(session.email) ? (
          <Link
            href="/app/admin"
            className="text-sm font-medium text-[#0d6e6e] hover:text-[#084848]"
          >
            Admin
          </Link>
        ) : null}
        <span className={`hidden text-sm sm:inline ${muted}`}>
          {session.email}
        </span>
        <form action="/api/auth/logout" method="post">
          <button type="submit" className={button}>
            Log out
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className="text-sm font-medium text-[#0d6e6e] hover:text-[#084848]"
      >
        Log in
      </Link>
      <Link href="/signup" className={button}>
        Sign up
      </Link>
    </div>
  );
}
