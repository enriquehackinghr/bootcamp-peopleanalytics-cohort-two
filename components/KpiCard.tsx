type Trend = "up" | "down" | "neutral";

const trendStyles: Record<Trend, string> = {
  up: "border-emerald-200 bg-emerald-50/60",
  down: "border-amber-200 bg-amber-50/60",
  neutral: "border-slate-200 bg-white",
};

export function KpiCard({
  label,
  value,
  detail,
  trend = "neutral",
}: {
  label: string;
  value: string;
  detail: string;
  trend?: Trend;
}) {
  return (
    <article
      className={`rounded-xl border p-5 shadow-sm ${trendStyles[trend]}`}
    >
      <p className="text-sm font-medium text-slate-600">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
        {value}
      </p>
      <p className="mt-2 text-sm leading-snug text-slate-500">{detail}</p>
    </article>
  );
}
