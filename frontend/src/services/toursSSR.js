const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
const ALLOWED = ["originId", "destinationId", "startDate", "endDate"];

async function getToursServer(filters = {}) {
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

async function getTourServer(id) {
  const res = await fetch(`${API_URL}/tour/${encodeURIComponent(id)}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`خطا در دریافت اطلاعات تور (${res.status})`);
  return res.json();
}
export { getToursServer, getTourServer };
