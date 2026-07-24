import { NextResponse } from "next/server";
import { dtp } from "@/lib/dtp";

export async function GET() {
  try {
    const grantToken = "eyJhbGciOiJIUzI1NiJ9.eyJncmFudF9pZCI6IjVhNGQwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDIwMiIsInN1YiI6ImRpZDpkdHA6c2FuZGJveC1kZW1vLWNvbnN1bWVyIiwidHdpbl9pZCI6IjVhNGQwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDEwMiIsImV2ZW50X3R5cGVzIjpudWxsLCJzeXN0ZW1zIjpudWxsLCJkYXRhX2RhdGVfcmFuZ2UiOm51bGwsImluY2x1ZGVfZnV0dXJlIjp0cnVlLCJpYXQiOjE3ODQ4NDkyNzIsImV4cCI6MTc4NzQ0MTI3Mn0.bfZHiSkofFY7T6AbeKCOZLLjHUJFPqs_18ua_y8avjc";

    const twin = await dtp.twins.connect(grantToken);

    const cardiovascular = await twin.systems.get("cardiovascular");

    return NextResponse.json({
      success: true,
      eventCount: cardiovascular.events.length,
      cardiovascular,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}