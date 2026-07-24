import { NextResponse } from "next/server";
import { dtp } from "@/lib/dtp";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: "Ontomorph SDK initialized successfully.",
      sdkLoaded: !!dtp,
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