export const PERMISSIONS = [
  {
    id: "employee_master",
    label: "Employee master",
    description: "Headcount, locations, and the organizational snapshot.",
  },
  {
    id: "performance",
    label: "Performance",
    description: "Engagement by site and performance ratings by function.",
  },
  {
    id: "compensation",
    label: "Compensation",
    description: "Workforce cost, revenue context, and people spend.",
  },
  {
    id: "talent_flow",
    label: "Talent flow",
    description: "Hires, exits, attrition, and recruiting funnel metrics.",
  },
  {
    id: "workforce_plan",
    label: "Workforce plan",
    description: "FY2026 plan gaps and people-strategy priorities.",
  },
] as const;

export type PermissionId = (typeof PERMISSIONS)[number]["id"];

export const PERMISSION_IDS = PERMISSIONS.map((permission) => permission.id);

export function isPermissionId(value: string): value is PermissionId {
  return PERMISSION_IDS.includes(value as PermissionId);
}
