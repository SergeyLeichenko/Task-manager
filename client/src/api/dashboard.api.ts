import type { Overview } from "@/types/dashboard/overview";

import { http } from "./http";

const DASHBOARD_ENDPOINT = "/dashboard";

export const dashboardApi = {
  getOverviews: () => http.get<Overview[]>(`${DASHBOARD_ENDPOINT}/overview`),
};