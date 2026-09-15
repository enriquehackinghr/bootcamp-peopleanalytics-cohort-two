import Link from "next/link";
import { DEFAULT_AFTER_AUTH } from "@/lib/auth-constants";

type Mode = "login" | "signup";

const copy: Record<
  Mode,
  {
    submit: string;
    action: string;
    altPrompt: string;
    altHref: string;
    altLabel: string;
  }
> = {
  login: {
    submit: "Log in",
    action: "/api/auth/login",
    altPrompt: "Need an account?",
    altHref: "/signup",
    altLabel: "Sign up",
  },
  signup: {
    submit: "Create account",
    action: "/api/auth/signup",
    altPrompt: "Already have access?",
    altHref: "/login",
    altLabel: "Log in",
  },
};

export function AuthForm({
  mode,
  next = DEFAULT_AFTER_AUTH,
  error,
}: {
  mode: Mode;
  next?: string;
  error?: string;
}) {
  const labels = copy[mode];

  return (
    <form action={labels.action} method="post" className="space-y-5">
      <input type="hidden" name="next" value={next} />

      <label className="block">
        <span className="text-sm font-medium text-[#084848]">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="name@hackinghr.io"
          className="mt-1.5 w-full rounded-xl border border-[#0d6e6e]/20 bg-white px-4 py-3 text-[#1a2e2e] outline-none ring-[#0d6e6e]/30 transition focus:border-[#0d6e6e] focus:ring-2"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-[#084848]">Password</span>
        <input
          name="password"
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          required
          className="mt-1.5 w-full rounded-xl border border-[#0d6e6e]/20 bg-white px-4 py-3 text-[#1a2e2e] outline-none ring-[#0d6e6e]/30 transition focus:border-[#0d6e6e] focus:ring-2"
        />
      </label>

      {mode === "signup" ? (
        <label className="block">
          <span className="text-sm font-medium text-[#084848]">
            Confirm password
          </span>
          <input
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            className="mt-1.5 w-full rounded-xl border border-[#0d6e6e]/20 bg-white px-4 py-3 text-[#1a2e2e] outline-none ring-[#0d6e6e]/30 transition focus:border-[#0d6e6e] focus:ring-2"
          />
        </label>
      ) : null}

      {error ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="w-full rounded-full bg-[#0d6e6e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#084848]"
      >
        {labels.submit}
      </button>

      <p className="text-center text-sm text-[#5c7575]">
        {labels.altPrompt}{" "}
        <Link
          href={`${labels.altHref}?next=${encodeURIComponent(next)}`}
          className="font-semibold text-[#0d6e6e] hover:text-[#084848]"
        >
          {labels.altLabel}
        </Link>
      </p>
    </form>
  );
}
