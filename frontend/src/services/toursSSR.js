const API_URL = process.env.NEXT_API_URL.replace(/\/$/, "");
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

  return res.json();
}
