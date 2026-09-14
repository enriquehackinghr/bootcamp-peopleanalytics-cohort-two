/** Synthetic Halstead metrics (FY2025 baseline, as of 31 Dec 2025). */

export const company = {
  name: "Halstead Veterinary Group",
  tagline: "Companion-animal care across the Pacific Northwest",
  baselineDate: "31 December 2025",
  locations: "9 clinics + Hillsboro support centre · OR, WA, ID, BC",
  leadership: {
    ceo: "Dana Whitfield",
    vpPeople: "Nia Coleman",
  },
};

export const headlineKpis = [
  {
    label: "Active employees",
    value: "300",
    detail: "FY2025 exit · plan 328 for FY2026",
    trend: "neutral" as const,
  },
  {
    label: "Annual revenue",
    value: "$54.0M",
    detail: "$2.1M below revenue budget (capacity)",
    trend: "down" as const,
  },
  {
    label: "Workforce cost",
    value: "47.6%",
    detail: "$25.7M of revenue",
    trend: "neutral" as const,
  },
  {
    label: "Total attrition",
    value: "22.0%",
    detail: "18.6% voluntary · 54 leavers",
    trend: "down" as const,
  },
  {
    label: "Engagement index",
    value: "73.8",
    detail: "Site range 58.5 – 86.8",
    trend: "neutral" as const,
  },
  {
    label: "Open doctor posts",
    value: "14",
    detail: "Avg 6 mo (Portland) to 9.5 mo (acquired sites)",
    trend: "down" as const,
  },
];

export const headcountByLocation = [
  { location: "Portland", headcount: 68, type: "Hospital" },
  { location: "Tacoma", headcount: 28, type: "Clinic" },
  { location: "Boise", headcount: 28, type: "Clinic" },
  { location: "Beaverton", headcount: 26, type: "Clinic" },
  { location: "Salem", headcount: 26, type: "Clinic" },
  { location: "Spokane", headcount: 26, type: "Clinic" },
  { location: "Surrey", headcount: 26, type: "Clinic" },
  { location: "Hillsboro", headcount: 26, type: "Support centre" },
  { location: "Eugene", headcount: 24, type: "Clinic" },
  { location: "Gresham", headcount: 22, type: "Clinic" },
];

/** Source: 14_Performance_Engagement_and_Pay.xlsx · Site engagement */
export const engagementBySite = [
  { site: "Boise", score: 86.8 },
  { site: "Beaverton", score: 86.1 },
  { site: "Eugene", score: 76.2 },
  { site: "Surrey", score: 74.8 },
  { site: "Portland", score: 74.2 },
  { site: "Tacoma", score: 73.8 },
  { site: "Hillsboro", score: 72.9 },
  { site: "Spokane", score: 70.6 },
  { site: "Salem", score: 60.0 },
  { site: "Gresham", score: 58.5 },
];

export const performanceByFunction = [
  { function: "Client Service", meanRating: 3.37, headcount: 54 },
  { function: "Specialty & Emergency", meanRating: 3.5, headcount: 8 },
  { function: "Practice Leadership", meanRating: 3.25, headcount: 16 },
  { function: "Veterinarians", meanRating: 3.11, headcount: 46 },
  { function: "Credentialed Techs", meanRating: 3.13, headcount: 86 },
  { function: "Vet Assistants", meanRating: 3.06, headcount: 70 },
  { function: "Finance", meanRating: 2.83, headcount: 6 },
];

export const talentFlow = {
  hiresFY2025: 83,
  exitsFY2025: 64,
  netGrowth: 19,
  regrettableVoluntary: 24,
  offerAcceptanceDoctors: 65,
  offerAcceptanceTechnicians: 67,
  medianDaysToFillStrategic: 82,
  medianDaysToFillOther: 49,
  veterinarians: 54,
  doctorsGP: 46,
  doctorsSpecialtyEmergency: 8,
};

export const workforcePlanFY2026 = {
  exitFY2025: 300,
  approvedBudget: 328,
  operationalForecast: 317,
  unfundedRequests: 370,
  doctorPostsBudget: 54,
  doctorPostsForecast: 48,
};

export const peopleInvestment = {
  learningSpend: 340_000,
  recruitingVendorSpend: 620_000,
  peopleFunctionFTE: 5,
};

export const strategicPriorities = [
  {
    title: "Fill doctor capacity",
    body: "Fourteen open doctor posts at year-end; recruiting forecast sits 11 headcount below the approved FY2026 plan.",
  },
  {
    title: "Delegate to credentialed technicians",
    body: "Technician utilization spans 48% (Salem, Gresham) to 79% (Beaverton, Boise)—the largest latent capacity lever in the plan.",
  },
  {
    title: "Integrate 2024 acquisitions",
    body: "Salem and Gresham show the lowest engagement and longest vacancies despite the highest visits per doctor day.",
  },
];

export const revenueMix = [
  { category: "Wellness & preventive", revenueM: 16.2, margin: 38 },
  { category: "Sick visits & diagnostics", revenueM: 13.5, margin: 34 },
  { category: "Surgery & dentistry", revenueM: 10.8, margin: 31 },
  { category: "Emergency & specialty", revenueM: 8.7, margin: 27 },
  { category: "Pharmacy & retail", revenueM: 4.8, margin: 21 },
];
