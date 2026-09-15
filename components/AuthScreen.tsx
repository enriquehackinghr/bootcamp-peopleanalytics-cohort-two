import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { PetImage } from "@/components/PetImage";
import { petPhotos } from "@/lib/pet-images";

export function AuthScreen({
  mode,
  next,
  error,
}: {
  mode: "login" | "signup";
  next: string;
  error?: string;
}) {
  const title = mode === "login" ? "Log in" : "Sign up";
  const subtitle =
    mode === "login"
      ? "Access the Halstead people analytics portal."
      : "Create access with your invited Halstead credentials.";

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1a2e2e]">
      <div className="bg-[#084848] px-4 py-2 text-center text-xs font-medium tracking-wide text-[#e8f6f4]">
        Internal · Invite-only people analytics portal
      </div>

      <header className="border-b border-[#0d6e6e]/10 bg-[#faf7f2]/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-[#0d6e6e]/30">
              <PetImage
                {...petPhotos.heroAccent}
                className="h-full w-full"
                sizes="44px"
              />
            </div>
            <div className="leading-tight">
              <p className="font-display text-lg font-semibold text-[#084848]">
                Halstead
              </p>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#0d6e6e]">
                Veterinary Group
              </p>
            </div>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-[#0d6e6e] hover:text-[#084848]"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
        <div className="hidden lg:block">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#0d6e6e]">
            People analytics
          </p>
          <h1 className="font-display mt-3 text-4xl font-semibold text-[#084848]">
            Workforce intelligence for Halstead leaders.
          </h1>
          <p className="mt-4 max-w-md text-[#4a6363]">
            Headcount, engagement, talent flow, and the FY2026 plan — reserved
            for invited users.
          </p>
          <div className="mt-8 overflow-hidden rounded-3xl shadow-xl ring-1 ring-[#0d6e6e]/10">
            <PetImage
              {...petPhotos.dashboardBanner}
              className="aspect-[16/10] w-full"
              sizes="50vw"
            />
          </div>
        </div>

        <div className="mx-auto w-full max-w-md rounded-3xl border border-[#0d6e6e]/10 bg-white p-8 shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-[#084848]">
            {title}
          </h2>
          <p className="mt-2 text-sm text-[#5c7575]">{subtitle}</p>
          <div className="mt-8">
            <AuthForm mode={mode} next={next} error={error} />
          </div>
        </div>
      </main>
    </div>
  );
}
