import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    message: "This endpoint is no longer in use. API calls are made directly from the client.",
  })
}

