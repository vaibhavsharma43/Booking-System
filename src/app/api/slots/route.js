import { connectDB } from "@/lib/db";
import Appointment from "@/app/models/appointment";
import Availability from "@/app/models/availability";
import  Unavailability from "@/app/models/unavailability";
import {generateSlots} from"@/lib/utils/generateSlots";
import {getAvailableSlotsAfterAppointments}  from"@/lib/utils/getAvailableSlotsAfterAppointments"
import ExtraAvailability from "@/app/models/extraAvailability";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export async function GET(req) {

    await connectDB();
  
    const url = new URL(req.url);
    const doctorId = url.searchParams.get("doctorId");
    const dateStr = url.searchParams.get("date");
    const isoDate = new Date(dateStr);
    const day = days[isoDate.getDay()];

    const unavailable= await Unavailability.findOne({doctorId,date:isoDate});


    // Checking Unavailability

    if (unavailable && unavailable.active === true) {
      return Response.json("Doctor is not Available");
    }
    const availability = await Availability.find({ doctorId });


   

  
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
  

    const slots =await generateSlots(availability[0].day[day].availability);
    
     const extraAvailability = await ExtraAvailability.find({ doctorId });
    const extraslot= await generateSlots(extraAvailability[0].slots);
// console.log(appointments)

    const availableSlots=await getAvailableSlotsAfterAppointments(slots,appointments);4
    const extraslots=await getAvailableSlotsAfterAppointments(extraslot,appointments);
console.log(extraslots)
   
  
return Response.json({available: availableSlots,extraAvailability: extraslots});
  }
  