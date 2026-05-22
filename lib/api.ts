const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? `HTTP ${res.status}`);
  }
  return res.json();
}

// --- Grants ---
export const getGrants = (params: Record<string, string> = {}) => {
  const qs = new URLSearchParams(params).toString();
  return apiFetch<GrantListResponse>(`/grants${qs ? "?" + qs : ""}`);
};

export const getGrant = (id: string) =>
  apiFetch<Grant>(`/grants/${id}`);

// --- Topics ---
export const getTopics = () => apiFetch<Topic[]>("/topics");

// --- Auth ---
export const login = (email: string, password: string) =>
  apiFetch<{ access_token: string }>("/auth/login", {
    method: "POST",
    body: new URLSearchParams({ username: email, password }).toString(),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

export const register = (data: RegisterPayload) =>
  apiFetch<User>("/auth/register", { method: "POST", body: JSON.stringify(data) });

export const getMe = (token: string) =>
  apiFetch<User>("/auth/me", {}, token);

// --- Dashboard ---
export const getStats = (token: string) =>
  apiFetch<OrgStats>("/dashboard/stats", {}, token);

export const getDeadlines = (token: string) =>
  apiFetch<DeadlineItem[]>("/dashboard/deadlines", {}, token);

export const getApplications = (token: string) =>
  apiFetch<Application[]>("/applications", {}, token);

export const getSavedGrants = (token: string) =>
  apiFetch<SavedGrant[]>("/saved-grants", {}, token);

export const saveGrant = (id: string, token: string) =>
  apiFetch(`/grants/${id}/save`, { method: "POST" }, token);

export const unsaveGrant = (id: string, token: string) =>
  apiFetch(`/grants/${id}/save`, { method: "DELETE" }, token);

// --- Types ---
export interface Grant {
  id: string; title: string; funder_name: string; funder_type: string;
  description: string; amount_min: number | null; amount_max: number | null;
  cofinancing_pct: number | null; deadline: string | null; status: string;
  eligible_countries: string[]; apply_url: string; apply_in_platform: boolean;
  language: string[]; topic_slugs: string[]; topic_labels: string[];
  days_until_deadline: number | null; created_at: string;
}
export interface GrantListResponse { total: number; page: number; page_size: number; results: Grant[]; }
export interface Topic { id: string; slug: string; label: string; icon: string; color_bg: string; color_text: string; grant_count: number; }
export interface User { id: string; email: string; full_name: string; role: string; org_id: string; }
export interface RegisterPayload { email: string; full_name: string; password: string; org_id: string; }
export interface OrgStats { total_applications: number; won_applications: number; active_applications: number; total_funds_won: number; saved_grants_count: number; }
export interface DeadlineItem { id: string; title: string; deadline: string; amount_max: number; days_remaining: number; application_status: string | null; }
export interface Application { id: string; org_id: string; grant_id: string; status: string; notes: string; amount_requested: number; applied_at: string; created_at: string; }
export interface SavedGrant { id: string; title: string; funder_name: string; amount_max: number; deadline: string; status: string; saved_at: string; days_until_deadline: number; }
