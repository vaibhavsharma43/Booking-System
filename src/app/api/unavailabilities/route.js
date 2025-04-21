import { connectDB } from "@/lib/db";
import Unavailability from "@/app/models/unavailability";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();
    
    const url = new URL(req.url);
    const doctorId = url.searchParams.get("doctorId");

    if (!doctorId) {
      return Response.json({ error: "doctorId is required" }, { status: 400 });
    }

    const unavailable = await Unavailability.find({ doctorId });

    if (!unavailable) {
      return Response.json({ message: "No unavailability found for this doctor." }, { status: 404 });
    }

    return Response.json(unavailable);
  } catch (error) {
    console.error("Error fetching unavailability:", error);
    return Response.json({ error: "Unable to fetch unavailabilities" }, { status: 500 });
  }
}
