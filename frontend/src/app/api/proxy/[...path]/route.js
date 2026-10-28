import {
  ACCESS_MAX_AGE,
  API_URL,
  backendPost,
  cookieOptions,
} from "@/lib/backend";
import { NextResponse } from "next/server";

const tokens = new Map();

function refreshOnce(refreshToken) {
  if (!tokens.has(refreshToken)) {
    const post = backendPost("/auth/refresh-token", { refreshToken })
      .then(({ res, data }) => (res.ok ? data.accessToken : null))
      .finally(() => tokens.delete(refreshToken));
    tokens.set(refreshToken, post);
  }
  return tokens.get(refreshToken);
}

async function handler(request, { params }) {
  const { path } = await params;
  const url = `${API_URL.replace(/\/$/, "")}/${path.join("/")}${request.nextUrl.search}`;
  const hasBody = !["GET", "HEAD"].includes(request.method);
  const body = hasBody ? await request.text() : undefined;

  const call = (token) =>
    fetch(url, {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body,
      cache: "no-store",
    });
  const refreshToken = request.cookies.get("refreshToken")?.value;
  let res = await call(request.cookies.get("accessToken")?.value);
  let newToken = null;

  if ((res.status === 401 || res.status === 403) && refreshToken) {
    newToken = await refreshOnce(refreshToken);
    if (!newToken) {
      const result = NextResponse.json({ message: "Sessian expired" });
      result.cookies.delete("accessToken");
      result.cookies.delete("refreshToken");
      return result;
    }
    res = await call(newToken);
  }
  const result = new NextResponse(await res.text(), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
  if (newToken)
    result.cookies.set("accessToken", newToken, {
      ...cookieOptions,
      maxAge: ACCESS_MAX_AGE,
    });
  return result;
}
export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
