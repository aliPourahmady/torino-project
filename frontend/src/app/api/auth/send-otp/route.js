import { backendPost } from "@/lib/backend";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { mobile } = await request.json();
  const { res, data } = await backendPost("auth/send-otp", { mobile });
  return NextResponse.json(data, { status: res.status });
}
