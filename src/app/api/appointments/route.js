import { connectDB } from "@/lib/db";
import Appointment from "@/app/models/appointment";

export async function POST(req) {
  await connectDB();
  
  const { doctorId, userId, date, slot } = await req.json();

  // Input validation
  if (!doctorId || !userId || !date || !slot) {
    return Response.json({ error: "All fields are required" }, { status: 400 });
  }

  // Check if the slot is already booked
  const alreadyBooked = await Appointment.findOne({ doctorId, userId, date, slot });
  if (alreadyBooked) {
    return Response.json({ error: "Slot already booked" }, { status: 400 });
  }

  // Create the new booking
  const booking = await Appointment.create({
    doctorId,
    userId,
    date,
    slot,
    status: "booked",
  });

  return Response.json({ success: true, booking });
}
