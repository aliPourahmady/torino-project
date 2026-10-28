import {
  ACCESS_MAX_AGE,
  backendPost,
  cookieOptions,
  REFRESH_MAX_AGE,
} from "@/lib/backend";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { mobile, code } = await request.json();
  const { res, data } = await backendPost("auth/check-otp", { mobile, code });
  if (!res.ok) return NextResponse.json(data, { status: res.status });

  const { accessToken, refreshToken, user } = data;
  const response = NextResponse.json({ user });
  response.cookies.set("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: ACCESS_MAX_AGE,
  });
  response.cookies.set("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: REFRESH_MAX_AGE,
  });
  return response;
}
