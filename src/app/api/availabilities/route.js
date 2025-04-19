// /app/api/availability/route.js or wherever your route is
import { connectDB } from "@/lib/db";
import Availability from "@/app/models/availability";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { doctorId, day, unavailability } = body;

    if (!doctorId || !day) {
      return new Response(JSON.stringify({ message: "doctorId and day are required." }), {
        status: 400,
      });
    }

    // Upsert (create new or update existing availability)
    const availability = await Availability.findOneAndUpdate(
      { doctorId },
      {
        doctorId,
        day,
        unavailability: unavailability || [],
        updatedAt: new Date(),
      },
      { new: true, upsert: true }
    );

    return new Response(JSON.stringify({ message: "Availability saved.", data: availability }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error saving availability:", error);
    return new Response(JSON.stringify({ message: "Internal server error." }), {
      status: 500,
    });
  }
}
