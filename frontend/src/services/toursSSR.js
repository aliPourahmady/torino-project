const API_URL = process.env.NEXT_API_URL?.replace(/\/$/, "");
const ALLOWED = ["originId", "destinationId", "startDate", "endDate"];

export async function getToursServer(filters = {}) {
  const params = new URLSearchParams();
  for (const key of ALLOWED) {
    const value = filters[key];
    if (typeof value === "string" && value) params.set(key, value);
  }

  const query = params.toString();
  const res = await fetch(`${API_URL}/tour${query ? `?${query}` : ""}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error(`خطا در دریافت اطلاعات تورها (${res.status})`);
  return res.json();
}

export async function getTourServer(id) {
  const res = await fetch(`${API_URL}/tour/${encodeURIComponent(id)}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`خطا در دریافت اطلاعات تور (${res.status})`);
  return res.json();
}
