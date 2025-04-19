import { connectDB } from "@/lib/db";
import Appointment from "@/app/models/appointment";
import Availability from "@/app/models/availability";

function generateSlots(availability) {
  const slots = [];

  availability.forEach(({ start, end, active }) => {
    if (!active) return;

    let [startHour, startMinute] = start.split(":").map(Number);
    let [endHour, endMinute] = end.split(":").map(Number);

    while (startHour < endHour || (startHour === endHour && startMinute < endMinute)) {
      const h = String(startHour).padStart(2, "0");
      const m = String(startMinute).padStart(2, "0");
      slots.push(`${h}:${m}`);

      startMinute += 30;
      if (startMinute >= 60) {
        startMinute = 0;
        startHour++;
      }
    }
  });

  return slots;
}


function getAvailableSlotsAfterAppointments(slots, appointments) {
  const bookedSlotSet = new Set(appointments.map(a => a.slot)); // a.slot should be "HH:MM"
  
  // No need to format — just check if the slot is booked
  return slots.filter(slot => !bookedSlotSet.has(slot));
}

  




const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export async function GET(req) {

    await connectDB();
  
    const url = new URL(req.url);
    const doctorId = url.searchParams.get("doctorId");
    const dateStr = url.searchParams.get("date");
    const d = new Date(dateStr);


    
    const day = days[d.getDay()];
    const availability = await Availability.find({ doctorId });

  

    if (availability.length > 0 && Array.isArray(availability[0].unavailability)) {
      const unavailability = availability[0].unavailability;
    
    
      const isOnLeave = unavailability.some(un => {
        const leaveDate = new Date(un).toISOString().split("T")[0];
        return leaveDate === dateStr;
      });
    
      if (isOnLeave) {
        return Response.json({ response: "Doctor is on leave" });
      }
    }
    
    

   const slots =await generateSlots(availability[0].day[day].availability);


  
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

  
// console.log(appointments)
    const availableSlots=getAvailableSlotsAfterAppointments(slots,appointments);
   
  
    return Response.json({ available: availableSlots });
  }
  