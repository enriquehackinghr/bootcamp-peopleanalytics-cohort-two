import Link from "next/link";
import { DashboardLink } from "@/components/DashboardLink";
import { PetImage } from "@/components/PetImage";
import { company } from "@/lib/halstead-metrics";
import { clinicGallery, petPhotos } from "@/lib/pet-images";

const clinics = [
  "Portland",
  "Beaverton",
  "Hillsboro",
  "Salem",
  "Gresham",
  "Eugene",
  "Tacoma",
  "Spokane",
  "Boise",
  "Surrey",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1a2e2e]">
      <div className="bg-[#084848] px-4 py-2 text-center text-xs font-medium tracking-wide text-[#e8f6f4]">
        Internal · People leaders &amp; HR — workforce intelligence portal
      </div>

      <header className="sticky top-0 z-50 border-b border-[#0d6e6e]/10 bg-[#faf7f2]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
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
          <nav
            className="hidden items-center gap-8 text-sm font-medium text-[#3d5c5c] md:flex"
            aria-label="Primary"
          >
            <a href="#about" className="transition hover:text-[#084848]">
              About
            </a>
            <a href="#clinics" className="transition hover:text-[#084848]">
              Our clinics
            </a>
            <a href="#people-analytics" className="transition hover:text-[#084848]">
              People analytics
            </a>
          </nav>
          <DashboardLink variant="nav">Dashboard</DashboardLink>
        </div>
      </header>

      <section className="relative min-h-[34rem] overflow-hidden text-white lg:min-h-[38rem]">
        <div className="absolute inset-0">
          <PetImage
            {...petPhotos.hero}
            className="h-full min-h-[34rem] w-full lg:min-h-[38rem]"
            priority
            sizes="100vw"
          />
        </div>
        <div className="landing-hero-overlay absolute inset-0" aria-hidden />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#a8e6df]">
              Since 2011 · Pacific Northwest
            </p>
            <h1 className="font-display mt-4 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.25rem]">
              Care for every companion. Clarity for every people decision.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#d1ebe8]">
              Halstead is a growing veterinary group with nine clinics, a
              Portland specialty &amp; emergency hospital, and a Hillsboro support
              centre — serving 24,000 client households with a team of 300.
            </p>
            <div className="mt-8 flex gap-3 lg:hidden">
              <PetImage
                {...petPhotos.clinicDog}
                className="aspect-square h-24 w-24 rounded-2xl ring-2 ring-white/30"
                sizes="96px"
              />
              <PetImage
                {...petPhotos.clinicCat}
                className="aspect-square h-24 w-24 rounded-2xl ring-2 ring-white/30"
                sizes="96px"
              />
            </div>
            <div className="relative z-10 mt-10 flex flex-wrap items-center gap-4">
              <DashboardLink variant="hero">Dashboard</DashboardLink>
              <a
                href="#people-analytics"
                className="inline-flex cursor-pointer items-center rounded-full border border-white/40 px-6 py-3.5 text-sm font-semibold text-white no-underline transition hover:bg-white/10"
              >
                Explore the people hub
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -right-4 -top-6 w-40 overflow-hidden rounded-2xl shadow-xl ring-2 ring-white/20">
              <PetImage
                {...petPhotos.heroAccent}
                className="aspect-square w-full"
                sizes="160px"
              />
            </div>
            <div className="absolute -bottom-8 left-0 w-36 overflow-hidden rounded-2xl shadow-lg ring-2 ring-white/20">
              <PetImage
                {...petPhotos.wellness}
                className="aspect-square w-full"
                sizes="144px"
              />
            </div>
            <div className="ml-8 rounded-2xl border border-white/15 bg-white/10 p-8 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#a8e6df]">
                FY2025 workforce snapshot
              </p>
              <dl className="mt-6 grid grid-cols-2 gap-6">
                {[
                  { label: "Team members", value: "300" },
                  { label: "Veterinarians", value: "54" },
                  { label: "Client households", value: "24,000" },
                  { label: "Open doctor posts", value: "14" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-sm text-[#c5e8e4]">{stat.label}</dt>
                    <dd className="font-display mt-1 text-3xl font-semibold">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm leading-relaxed text-[#b8ddd8]">
                Revenue follows doctor capacity. This portal connects clinic
                leaders and HR to the metrics that explain where we are winning
                — and where vacancies are costing us patients.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              <PetImage
                {...petPhotos.emergency}
                className="aspect-[3/4] rounded-2xl shadow-md"
                sizes="(max-width:1024px) 50vw, 240px"
              />
              <div className="flex flex-col gap-3 pt-8">
                <PetImage
                  {...petPhotos.clinicCat}
                  className="aspect-square rounded-2xl shadow-md"
                  sizes="(max-width:1024px) 50vw, 200px"
                />
                <PetImage
                  {...petPhotos.clinicDog}
                  className="aspect-[4/3] rounded-2xl shadow-md"
                  sizes="(max-width:1024px) 50vw, 200px"
                />
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-[#7aa8a3] lg:text-left">
              Companion animals we serve across Halstead clinics
            </p>
          </div>
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl font-semibold text-[#084848]">
              Built on clinical excellence across Oregon, Washington, Idaho &amp;
              British Columbia
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#4a6363]">
              Founded by two veterinarians in Beaverton, Halstead expanded through
              organic growth and thoughtful acquisition — including our Portland
              24-hour emergency hospital and 2024 additions in Salem and Gresham.
              Today we deliver wellness, surgery, emergency, and specialty care
              with one standard: put the animal and the client at the centre.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Wellness & prevention",
                  text: "$16.2M revenue · highest margin service line",
                  photo: petPhotos.wellness,
                },
                {
                  title: "Emergency & specialty",
                  text: "Portland hospital · revenue per doctor leader",
                  photo: petPhotos.emergency,
                },
                {
                  title: "Integrated support",
                  text: "Finance, people, marketing & IT in Hillsboro",
                  photo: petPhotos.team,
                },
                {
                  title: "Growth with discipline",
                  text: "FY2026–28 plan tied to filling doctor capacity",
                  photo: petPhotos.clinicDog,
                },
              ].map((card) => (
                <article
                  key={card.title}
                  className="overflow-hidden rounded-xl border border-[#0d6e6e]/10 bg-white shadow-sm"
                >
                  <PetImage
                    {...card.photo}
                    className="aspect-[16/9] w-full"
                    sizes="(max-width:640px) 100vw, 280px"
                  />
                  <div className="p-5">
                    <h3 className="font-semibold text-[#084848]">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5c7575]">
                      {card.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="clinics"
        className="border-y border-[#0d6e6e]/10 bg-white py-16"
      >
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-center text-3xl font-semibold text-[#084848]">
            Ten locations. One Halstead team.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[#5c7575]">
            Nine clinics plus our Hillsboro support centre — where every function
            head sits and no patients are seen.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {clinicGallery.map((photo) => (
              <PetImage
                key={photo.src}
                {...photo}
                className="aspect-[4/3] rounded-2xl shadow-sm ring-1 ring-[#0d6e6e]/10"
                sizes="(max-width:640px) 50vw, 25vw"
              />
            ))}
          </div>
          <ul className="mt-10 flex flex-wrap justify-center gap-3">
            {clinics.map((name) => (
              <li
                key={name}
                className="rounded-full border border-[#0d6e6e]/15 bg-[#faf7f2] px-4 py-2 text-sm font-medium text-[#084848]"
              >
                {name}
                {name === "Hillsboro" ? " · Support" : ""}
                {name === "Portland" ? " · Hospital" : ""}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="people-analytics" className="mx-auto max-w-6xl px-6 py-20">
        <div className="overflow-hidden rounded-3xl bg-[#084848] text-white shadow-xl">
          <div className="grid lg:grid-cols-5">
            <div className="relative min-h-[14rem] lg:col-span-2 lg:min-h-full">
              <PetImage
                {...petPhotos.dashboardBanner}
                className="absolute inset-0 h-full w-full"
                sizes="(max-width:1024px) 100vw, 40vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#084848] via-[#084848]/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#084848]/30 lg:to-[#084848]"
                aria-hidden
              />
            </div>
            <div className="px-8 py-12 sm:px-12 lg:col-span-3 lg:px-12 lg:py-12">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a8e6df]">
                People analytics
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold sm:text-4xl">
                The dashboard {company.leadership.vpPeople} and clinic leaders
                use to align people decisions with capacity.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-[#c5e8e4]">
                Headcount by site, engagement, talent flow, FY2026 workforce
                plan gaps, and people investment — grounded in our FY2025
                baseline ({company.baselineDate}). Built for HR and practice
                managers who need one trusted view, not another spreadsheet.
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  "Doctor vacancies & time-to-fill",
                  "Engagement by clinic (Gresham to Boise)",
                  "Recruiting vs learning spend trade-offs",
                  "Workforce plan: budget vs recruiting forecast",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-snug text-[#e8f6f4]"
                  >
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#c47a2c]"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="relative z-10 mt-8">
                <DashboardLink variant="primary">Dashboard</DashboardLink>
              </div>
            </div>
          </div>
        </div>

        <blockquote className="mx-auto mt-16 max-w-3xl text-center">
          <div className="mx-auto mb-6 flex justify-center gap-2">
            <PetImage
              {...petPhotos.heroAccent}
              className="h-14 w-14 rounded-full ring-2 ring-[#0d6e6e]/20"
              sizes="56px"
            />
            <PetImage
              {...petPhotos.wellness}
              className="h-14 w-14 rounded-full ring-2 ring-[#0d6e6e]/20"
              sizes="56px"
            />
          </div>
          <p className="font-display text-xl leading-relaxed text-[#084848] sm:text-2xl">
            &ldquo;We ended the year twenty people under headcount budget — and
            that is the same story as revenue lost to unfilled doctor posts.
            Leaders deserve data that connects those dots.&rdquo;
          </p>
          <footer className="mt-4 text-sm font-medium text-[#5c7575]">
            Dana Whitfield, CEO · December 2025
          </footer>
        </blockquote>
      </section>

      <footer className="border-t border-[#0d6e6e]/10 bg-[#0a3d3c] px-6 py-12 text-[#b8ddd8]">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex gap-4">
            <PetImage
              {...petPhotos.team}
              className="hidden h-20 w-20 shrink-0 rounded-xl sm:block"
              sizes="80px"
            />
            <div>
              <p className="font-display text-xl font-semibold text-white">
                {company.name}
              </p>
              <p className="mt-2 max-w-md text-sm leading-relaxed">
                {company.tagline}. {company.locations}.
              </p>
            </div>
          </div>
          <div className="text-sm">
            <p className="font-medium text-white">People analytics</p>
            <DashboardLink
              variant="nav"
              className="mt-3 !bg-[#c47a2c] hover:!bg-[#a86524]"
            >
              Dashboard
            </DashboardLink>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-xs text-[#7aa8a3]">
          Fictional training case · People Analytics Bootcamp · Synthetic data
          only · Pet photos via Unsplash
        </p>
      </footer>
    </div>
  );
}
