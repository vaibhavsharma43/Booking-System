import { connectDB } from "@/lib/db";
import Appointment from "@/app/models/appointment";
import Availability from "@/app/models/availability";
import Unavailability from "@/app/models/unavailability";
import { generateSlots } from "@/lib/utils/generateSlots";
import { getAvailableSlotsAfterAppointments } from "@/lib/utils/getAvailableSlotsAfterAppointments";
import{mergeUniqueSlots}from "@/lib/utils/mergeUniqueSlots";
import ExtraAvailability from "@/app/models/extraAvailability";
import { NextResponse } from "next/server";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export async function GET(req) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const doctorId = url.searchParams.get("doctorId");
    const dateStr = url.searchParams.get("date");
    const isoDate = new Date(dateStr);
    const day = days[isoDate.getDay()];
    const mydate = new Date(isoDate);

    const unavailable = await Unavailability.findOne({ doctorId, date: mydate });

    // Check Unavailability
    if (unavailable?.active) {
      return NextResponse.json({ message: "Doctor is not available" });
    }

    const availability = await Availability.find({ doctorId });

    if (!availability.length) {
      return NextResponse.json({ message: "No availability schedule found" });
    }

    const startOfDay = new Date(isoDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(isoDate.setHours(23, 59, 59, 999));

    const appointments = await Appointment.find({
      doctorId,
      date: { $gte: startOfDay, $lte: endOfDay },
      status: "booked",
    });

    const slots = await generateSlots(availability[0].day[day].availability);
    const availableSlots = await getAvailableSlotsAfterAppointments(slots, appointments);

    const extraAvailability = await ExtraAvailability.findOne({ doctorId,date:mydate });
     console.log(extraAvailability)
    let extraslots = [];
    let response=[]

    if (extraAvailability && extraAvailability.slots.length>0) {
      const extraslotRaw = await generateSlots(extraAvailability.slots);
      extraslots = await getAvailableSlotsAfterAppointments(extraslotRaw, appointments);
      response=await mergeUniqueSlots(availableSlots,extraslots);
    }else{
      response=availableSlots
    }

    return NextResponse.json({
      available: response
      
    });

  } catch (error) {
    console.error("Error fetching availability:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
