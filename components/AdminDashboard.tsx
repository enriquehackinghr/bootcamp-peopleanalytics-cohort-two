import Link from "next/link";
import { AuthControls } from "@/components/AuthControls";
import { PetImage } from "@/components/PetImage";
import { PERMISSIONS } from "@/lib/permissions";
import type { PermissionStore } from "@/lib/permission-store";
import { petPhotos } from "@/lib/pet-images";
import { USERS } from "@/lib/users";

export function AdminDashboard({
  store,
  savedEmail,
  error,
}: {
  store: PermissionStore;
  savedEmail?: string;
  error?: string;
}) {
  const members = USERS.filter((user) => user.role === "member");
  const admins = USERS.filter((user) => user.role === "admin");

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
        <div className="relative mx-auto flex h-full max-w-7xl items-end px-6 pb-5">
          <div className="text-white">
            <p className="text-xs font-medium uppercase tracking-wider text-[#a8e6df]">
              Administration
            </p>
            <h1 className="text-xl font-semibold sm:text-2xl">
              Data access permissions
            </h1>
            <p className="text-sm text-[#d1ebe8]">
              Grant each user only the people-data domains they need.
            </p>
          </div>
        </div>
      </div>

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/" className="text-[#0d6e6e] hover:text-[#084848]">
              ← Home
            </Link>
            <Link
              href="/app/dashboard"
              className="text-[#0d6e6e] hover:text-[#084848]"
            >
              Workforce dashboard
            </Link>
          </div>
          <AuthControls tone="dashboard" />
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        {savedEmail ? (
          <p
            role="status"
            className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
          >
            Saved data access for {savedEmail}.
          </p>
        ) : null}
        {error ? (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {error}
          </p>
        ) : null}

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Administrators</h2>
          <p className="mt-1 text-sm text-slate-500">
            Admins can open this console and see every data domain.
          </p>
          <ul className="mt-4 space-y-3">
            {admins.map((user) => (
              <li
                key={user.email}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-slate-900">{user.name}</p>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
                <span className="rounded-full bg-[#084848] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  Full access
                </span>
              </li>
            ))}
          </ul>
        </section>

        {members.map((user) => {
          const assigned = new Set(store[user.email] ?? []);
          return (
            <section
              key={user.email}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {user.name}
                  </h2>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
                <p className="text-sm text-slate-500">
                  {assigned.size === 0
                    ? "No data access assigned"
                    : `${assigned.size} of ${PERMISSIONS.length} domains`}
                </p>
              </div>

              <form
                action="/api/admin/permissions"
                method="post"
                className="mt-6 space-y-4"
              >
                <input type="hidden" name="email" value={user.email} />
                <fieldset className="grid gap-3 md:grid-cols-2">
                  <legend className="sr-only">Data domains</legend>
                  {PERMISSIONS.map((permission) => (
                    <label
                      key={permission.id}
                      className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 px-4 py-3 hover:border-[#0d6e6e]/40"
                    >
                      <input
                        type="checkbox"
                        name="permissions"
                        value={permission.id}
                        defaultChecked={assigned.has(permission.id)}
                        className="mt-1 h-4 w-4 accent-[#0d6e6e]"
                      />
                      <span>
                        <span className="block font-medium text-slate-900">
                          {permission.label}
                        </span>
                        <span className="mt-1 block text-sm text-slate-500">
                          {permission.description}
                        </span>
                      </span>
                    </label>
                  ))}
                </fieldset>
                <button
                  type="submit"
                  className="rounded-full bg-[#0d6e6e] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#084848]"
                >
                  Save access
                </button>
              </form>
            </section>
          );
        })}
      </main>
    </div>
  );
}
