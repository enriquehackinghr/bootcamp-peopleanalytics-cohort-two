export const DASHBOARD_HREF = "/app/dashboard";

type Variant = "primary" | "nav" | "hero";

const styles: Record<Variant, string> = {
  primary:
    "inline-flex cursor-pointer items-center justify-center rounded-full bg-[#c47a2c] px-8 py-3.5 text-base font-semibold text-white no-underline shadow-lg shadow-[#c47a2c]/30 transition hover:bg-[#a86524] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c47a2c]",
  nav: "inline-flex cursor-pointer items-center justify-center rounded-full bg-[#0d6e6e] px-5 py-2.5 text-sm font-semibold text-white no-underline transition hover:bg-[#084848]",
  hero: "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-[#084848] no-underline shadow-xl transition hover:bg-[#f0fdfa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
};

export function DashboardLink({
  variant = "primary",
  className = "",
  children = "Dashboard",
}: {
  variant?: Variant;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a href={DASHBOARD_HREF} className={`${styles[variant]} ${className}`.trim()}>
      {children}
      {variant === "hero" ? (
        <span aria-hidden className="text-lg">
          →
        </span>
      ) : null}
    </a>
  );
}
