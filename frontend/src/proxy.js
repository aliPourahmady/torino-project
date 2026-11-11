import { NextResponse } from "next/server";

export function proxy(request) {
  const hasSession =
    request.cookies.has("accessToken") || request.cookies.has("refreshToken");

  if (hasSession) return NextResponse.next();

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/checkout/:path*", "/profile/:path*"],
};
