import { NextResponse } from "next/server";

export function proxy(request) {
  const hasSession =
    request.cookies.has("accessToken") || request.cookies.has("refreshToken");

  if (!hasSession) {
    const url = new URL("/", request.url);
    url.searchParams.set("login", 1);
    url.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/checkout/:path*", "/profile/:path*"],
};
