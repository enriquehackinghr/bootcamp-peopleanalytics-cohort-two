import Link from "next/link";
import { AuthControls } from "@/components/AuthControls";
import { KpiCard } from "@/components/KpiCard";
import { PetImage } from "@/components/PetImage";
import { petPhotos } from "@/lib/pet-images";
import {
  EngagementChart,
  HeadcountChart,
  PeopleSpendChart,
  PerformanceChart,
  WorkforcePlanChart,
} from "@/components/DashboardCharts";
import { getSession } from "@/lib/auth";
import { getEffectivePermissions } from "@/lib/permission-store";
import { PERMISSIONS, type PermissionId } from "@/lib/permissions";
import { isAdmin } from "@/lib/users";
import {
  company,
  engagementBySite,
  headcountByLocation,
  headlineKpis,
  peopleInvestment,
  performanceByFunction,
  strategicPriorities,
  talentFlow,
  workforcePlanFY2026,
} from "@/lib/halstead-metrics";

const kpiPermission: Record<string, PermissionId> = {
  "Active employees": "employee_master",
  "Annual revenue": "compensation",
  "Workforce cost": "compensation",
  "Total attrition": "talent_flow",
  "Engagement index": "performance",
  "Open doctor posts": "talent_flow",
};

export async function DashboardView() {
  const session = await getSession();
  const email = session?.email ?? "";
  const permissions = email
    ? await getEffectivePermissions(email)
    : new Set<PermissionId>();
  const can = (id: PermissionId) => permissions.has(id);
  const visibleKpis = headlineKpis.filter((kpi) =>
    can(kpiPermission[kpi.label] ?? "employee_master"),
  );
  const assignedLabels = PERMISSIONS.filter((permission) =>
    can(permission.id),
  ).map((permission) => permission.label);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative h-36 overflow-hidden sm:h-44">
        <PetImage
          {...petPhotos.dashboardBanner}
          className="absolute inset-0 h-full w-full"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#084848]/95 via-[#0d6e6e]/85 to-[#084848]/75"
          aria-hidden
        />
        <div className="relative mx-auto flex h-full max-w-7xl items-end justify-between gap-4 px-6 pb-5 pt-4">
          <div className="text-white">
            <p className="text-xs font-medium uppercase tracking-wider text-[#a8e6df]">
              People Analytics
            </p>
            <h1 className="text-xl font-semibold sm:text-2xl">
              {company.name} · Workforce dashboard
            </h1>
            <p className="text-sm text-[#d1ebe8]">
              Baseline {company.baselineDate} · VP People{" "}
              {company.leadership.vpPeople}
            </p>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <PetImage
              {...petPhotos.clinicDog}
              className="h-16 w-16 rounded-full ring-2 ring-white/40"
              sizes="64px"
            />
            <PetImage
              {...petPhotos.clinicCat}
              className="h-16 w-16 rounded-full ring-2 ring-white/40"
              sizes="64px"
            />
          </div>
        </div>
      </div>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          <Link
            href="/"
            className="text-sm font-medium text-[#0d6e6e] hover:text-[#084848]"
          >
            ← Back to home
          </Link>
          <AuthControls tone="dashboard" />
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-10 px-6 py-8">
        {permissions.size === 0 ? (
          <section className="rounded-xl border border-slate-200 bg-white px-8 py-16 text-center shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0d6e6e]">
              Restricted
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">
              No data access has been assigned
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-600">
              You can sign in, but people analytics stay hidden until an
              administrator grants a data domain such as performance,
              compensation, or employee master.
            </p>
          </section>
        ) : (
          <>
            <p className="text-sm text-slate-500">
              Your access: {assignedLabels.join(" · ")}
              {isAdmin(email) ? " · Administrator" : ""}
            </p>

            {visibleKpis.length > 0 ? (
              <section>
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Headline metrics
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {visibleKpis.map((kpi) => (
                    <KpiCard key={kpi.label} {...kpi} />
                  ))}
                </div>
              </section>
            ) : null}

            {can("employee_master") || can("performance") ? (
              <section className="grid gap-6 lg:grid-cols-2">
                {can("employee_master") ? (
                  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900">
                      Headcount by location
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      300 employees · Hillsboro is the non-clinical support
                      centre
                    </p>
                    <div className="mt-4">
                      <HeadcountChart data={headcountByLocation} />
                    </div>
                  </div>
                ) : null}

                {can("performance") ? (
                  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900">
                      Engagement by site
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Group mean 73.8 · lowest Gresham (58.5) and Salem (60.0)
                    </p>
                    <div className="mt-4">
                      <EngagementChart data={engagementBySite} />
                    </div>
                  </div>
                ) : null}
              </section>
            ) : null}

            {can("performance") ? (
              <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">
                  Performance by function
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Mean manager rating on a 1–4 scale
                </p>
                <div className="mt-4">
                  <PerformanceChart data={performanceByFunction} />
                </div>
              </section>
            ) : null}

            {can("talent_flow") || can("workforce_plan") ? (
              <section className="grid gap-6 lg:grid-cols-3">
                {can("talent_flow") ? (
                  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
                    <h2 className="text-lg font-semibold text-slate-900">
                      Talent flow (FY2025)
                    </h2>
                    <dl className="mt-4 space-y-3 text-sm">
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <dt className="text-slate-600">Hires / exits</dt>
                        <dd className="font-medium text-slate-900">
                          {talentFlow.hiresFY2025} / {talentFlow.exitsFY2025}
                        </dd>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <dt className="text-slate-600">Regrettable voluntary</dt>
                        <dd className="font-medium text-slate-900">
                          {talentFlow.regrettableVoluntary}
                        </dd>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <dt className="text-slate-600">
                          Offer acceptance (doctors)
                        </dt>
                        <dd className="font-medium text-slate-900">
                          {talentFlow.offerAcceptanceDoctors}%
                        </dd>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <dt className="text-slate-600">
                          Offer acceptance (techs)
                        </dt>
                        <dd className="font-medium text-slate-900">
                          {talentFlow.offerAcceptanceTechnicians}%
                        </dd>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-2">
                        <dt className="text-slate-600">
                          Days to fill (strategic)
                        </dt>
                        <dd className="font-medium text-slate-900">
                          {talentFlow.medianDaysToFillStrategic} median
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-slate-600">Veterinarians (FTE)</dt>
                        <dd className="font-medium text-slate-900">
                          {talentFlow.veterinarians} ({talentFlow.doctorsGP} GP
                          + {talentFlow.doctorsSpecialtyEmergency} specialty/ER)
                        </dd>
                      </div>
                    </dl>
                  </div>
                ) : null}

                {can("workforce_plan") ? (
                  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                    <h2 className="text-lg font-semibold text-slate-900">
                      FY2026 workforce plan gap
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Recruiting forecast (
                      {workforcePlanFY2026.operationalForecast}) is below
                      approved budget ({workforcePlanFY2026.approvedBudget})
                      for the first time — driven by doctor hiring risk.
                    </p>
                    <div className="mt-4">
                      <WorkforcePlanChart
                        exitFY2025={workforcePlanFY2026.exitFY2025}
                        forecast={workforcePlanFY2026.operationalForecast}
                        budget={workforcePlanFY2026.approvedBudget}
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-400">
                      Unfunded manager requests total{" "}
                      {workforcePlanFY2026.unfundedRequests} (not shown on
                      chart).
                    </p>
                  </div>
                ) : null}
              </section>
            ) : null}

            {can("compensation") || can("workforce_plan") ? (
              <section className="grid gap-6 lg:grid-cols-2">
                {can("compensation") ? (
                  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900">
                      People nonlabor spend
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Recruiting vendors at 1.8× learning — a pattern CEO Dana
                      Whitfield flagged for explicit trade-off decisions in
                      2026.
                    </p>
                    <div className="mt-4">
                      <PeopleSpendChart
                        learning={peopleInvestment.learningSpend}
                        recruiting={peopleInvestment.recruitingVendorSpend}
                      />
                    </div>
                  </div>
                ) : null}

                {can("workforce_plan") ? (
                  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900">
                      Strategic priorities (people lens)
                    </h2>
                    <ul className="mt-4 space-y-4">
                      {strategicPriorities.map((item) => (
                        <li
                          key={item.title}
                          className="border-l-4 border-[#0d6e6e] pl-4"
                        >
                          <h3 className="font-medium text-slate-900">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm text-slate-600">
                            {item.body}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </section>
            ) : null}
          </>
        )}
      </main>
    </div>
  );
}
