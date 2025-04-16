"use client";
import { useState, useEffect } from "react";
import { getAvailableSlots, bookAppointment } from "@/lib/api";

export default function AppointmentForm({ doctorId }) {
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [slot, setSlot] = useState("");
  const [userId, setUserId] = useState(""); // replace with actual user session
  const [message, setMessage] = useState("");
  const[day,setDay]=useState("");

  useEffect(() => {
    
    console.log("Date",date)
    if (date) {

   getAvailableSlots(doctorId, date,"Wednesday").then(setSlots)
    }

  }, [date, doctorId]);

  const handleSubmit = async (e) => {
    console.log("xxxxxxxxx")
    e.preventDefault();
    try {
  
      const res = await bookAppointment({ doctorId, userId, date, slot });
      setMessage("Appointment booked successfully");
    } catch (err) {
      setMessage(err?.response?.data?.error || "Booking failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <input
        type="text"
        placeholder="Enter your userId"
        className="border p-2 w-full"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      />
      <input
        type="date"
        className="border p-2 w-full"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <select
        className="border p-2 w-full"
        value={slot}
        onChange={(e) => setSlot(e.target.value)}
        required
      >
        <option value="">Select a slot</option>
        {slots.map((s, index) => (
          <option key={index} value={s}>{s}</option>
        ))}
      </select>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Book
      </button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
}
