export const DASHBOARD_HREF = "/app/dashboard";

type Variant = "primary" | "nav" | "hero";

const styles: Record<Variant, string> = {
  primary:
    "inline-flex cursor-pointer items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-[#151319] no-underline shadow-lg shadow-black/30 transition hover:bg-[#d9b8f3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9b8f3]",
  nav: "inline-flex cursor-pointer items-center justify-center rounded-full bg-[#151319] px-5 py-2.5 text-sm font-semibold text-white no-underline transition hover:bg-[#72419b]",
  hero: "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-[#151319] no-underline shadow-xl transition hover:bg-[#f3eafa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
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
