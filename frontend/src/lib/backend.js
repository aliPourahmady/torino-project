import api from "./api";

export const API_URL = process.env.NEXT_API_URL;

export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  path: "/",
};

export const ACCESS_MAX_AGE = 60 * 60;
export const REFRESH_MAX_AGE = 60 * 60 * 24 * 7;

export async function backendPost(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  return { res, data };
}
