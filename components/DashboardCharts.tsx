"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const teal = "#0d6e6e";
const tealLight = "#3a9a9a";
const amber = "#c47a2c";

const locationColors = [
  "#0d6e6e",
  "#2563eb",
  "#c47a2c",
  "#7c3aed",
  "#059669",
  "#db2777",
  "#0891b2",
  "#ea580c",
  "#4f46e5",
  "#64748b",
];

function engagementColor(score: number) {
  if (score >= 80) return teal;
  if (score >= 70) return tealLight;
  if (score >= 65) return "#94a3b8";
  return amber;
}

export function HeadcountChart({
  data,
}: {
  data: { location: string; headcount: number; type: string }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" />
        <YAxis
          type="category"
          dataKey="location"
          width={88}
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          formatter={(value: number) => [`${value} employees`, "Headcount"]}
        />
        <Bar dataKey="headcount" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={entry.location}
              fill={locationColors[index % locationColors.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function EngagementChart({
  data,
}: {
  data: { site: string; score: number }[];
}) {
  const sorted = [...data].sort((a, b) => a.score - b.score);
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={sorted} margin={{ bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="site"
          tick={{ fontSize: 11 }}
          interval={0}
          angle={-35}
          textAnchor="end"
          height={64}
        />
        <YAxis domain={[50, 90]} />
        <Tooltip formatter={(v: number) => [v.toFixed(1), "Engagement index"]} />
        <Bar dataKey="score" radius={[4, 4, 0, 0]}>
          {sorted.map((entry) => (
            <Cell key={entry.site} fill={engagementColor(entry.score)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function WorkforcePlanChart({
  exitFY2025,
  forecast,
  budget,
}: {
  exitFY2025: number;
  forecast: number;
  budget: number;
}) {
  const data = [
    { label: "FY2025 exit", value: exitFY2025 },
    { label: "FY2026 forecast", value: forecast },
    { label: "FY2026 budget", value: budget },
  ];
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" tick={{ fontSize: 12 }} />
        <YAxis domain={[280, 340]} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke={teal}
          strokeWidth={3}
          dot={{ r: 6, fill: teal }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function PeopleSpendChart({
  learning,
  recruiting,
}: {
  learning: number;
  recruiting: number;
}) {
  const data = [
    { name: "Learning & development", amount: learning / 1000 },
    { name: "Recruiting vendors", amount: recruiting / 1000 },
  ];
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
        <YAxis tickFormatter={(v) => `$${v}k`} />
        <Tooltip formatter={(v: number) => [`$${v.toFixed(0)}k`, "FY2025 spend"]} />
        <Legend />
        <Bar dataKey="amount" fill={teal} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
