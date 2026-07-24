import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "CareWise Twin backend is running.",
    apiKeyConfigured: !!process.env.DTP_API_KEY,
  });
}