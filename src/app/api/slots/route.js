import { connectDB } from "@/lib/db";
import Appointment from "@/app/models/appointment";
import Availability from "@/app/models/availability";

function generateSlots(availableStartTime, availableEndTime, unavailableStartTime, unavailableEndTime) {
  const [startHour, startMinute] = availableStartTime.split(":").map(Number);
  const [endHour, endMinute] = availableEndTime.split(":").map(Number);

  const [uStartHour, uStartMinute] = unavailableStartTime.split(":").map(Number);
  const [uEndHour, uEndMinute] = unavailableEndTime.split(":").map(Number);

  let hour = startHour;
  let minute = startMinute;
  const slots = [];

  while (hour < endHour || (hour === endHour && minute < endMinute)) {
    // Convert current slot time and unavailable range to minutes for easy comparison
    const currentTimeInMinutes = hour * 60 + minute;
    const uStartTimeInMinutes = uStartHour * 60 + uStartMinute;
    const uEndTimeInMinutes = uEndHour * 60 + uEndMinute;
    // If the slot is outside the unavailable window, keep it
    if (currentTimeInMinutes < uStartTimeInMinutes || currentTimeInMinutes >= uEndTimeInMinutes) {
      slots.push({ hour, minute });
    }

    minute += 30;
    if (minute === 60) {
      minute = 0;
      hour++;
    }
  }

  // console.log(slots);
  return slots;
}

function getAvailableSlotsAfterAppointments(slots, appointments) {
  // Convert appointments to a Set for faster lookup
  const bookedSlotSet = new Set(appointments.map(a => a.slot));

  // Format slot object into "HH:MM" string
  function formatSlot(slot) {
    const h = slot.hour.toString().padStart(2, '0');
    const m = slot.minute.toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  // Filter out booked slots
  return slots.filter(slot => !bookedSlotSet.has(formatSlot(slot)));
}






export async function GET(req) {
    await connectDB();
    const url = new URL(req.url);
    const doctorId = url.searchParams.get("doctorId");
    const dateStr = url.searchParams.get("date");
    const day = url.searchParams.get("day");
  
    if (!doctorId || !dateStr || !day) {
      return Response.json({ error: "doctorId, date and day are required" }, { status: 400 });
    }

  
    // Convert date string to Date range (UTC safe)
    const date = new Date(dateStr);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));
    // Fetch booked appointments
    const appointments = await Appointment.find({
      doctorId,
      date: { $gte: startOfDay, $lte: endOfDay },
      status: "booked",
    });

  
// console.log(dateOnly); // Output: 2025-04-15

    // Fetch availability for the day
    const availability = await Availability.find({ doctorId, day });
    if (!availability || !availability[0].availableSlots || availability[0].availableSlots.length === 0) {
      return Response.json({ available: [] });
    }
  
   const slots= generateSlots(availability[0].availableSlots[0].start,availability[0].availableSlots[0].end,availability[0].unavailableSlots[0].start,availability[0].unavailableSlots[0].end)

    const availableSlots=getAvailableSlotsAfterAppointments(slots,appointments);
   
  
    return Response.json({ available: availableSlots });
  }
  