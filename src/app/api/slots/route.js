import { connectDB } from "@/lib/db";
import Appointment from "@/app/models/appointment";

const allSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

export async function GET(req) {
    await connectDB();
    const url = new URL(req.url);
    const doctorId = url.searchParams.get("doctorId");
    const date = url.searchParams.get("date");

    if (!doctorId || !date) {
        return Response.json({ error: "doctorId and date are required" }, { status: 400 });
    }

    // Fetch booked appointments for the doctor and date
    const appointments = await Appointment.find({ doctorId, date, status: "booked" });

    // Extract booked slots from the appointments
    const bookedSlots = appointments.map(a => a.slot);

    // Filter out booked slots from all available slots
    const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

    return Response.json({ available: availableSlots });
}
