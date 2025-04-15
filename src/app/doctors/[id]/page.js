"use client";

import { useEffect, useState } from "react";
import { getAvailableSlots, bookAppointment, getDoctors } from "@/lib/api";
import AppointmentForm from "@/components/AppointmentForm";

export default function DoctorPage({ params }) {
  const doctorId = params.id;
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    async function fetchDoctor() {
      const all = await getDoctors();
      const found = all.find((d) => d._id === doctorId);
      setDoctor(found);
    }
    fetchDoctor();
  }, [doctorId]);

  return (
    <div className="p-6">
      {doctor ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{doctor.name}</h1>
          <p><strong>Specialization:</strong> {doctor.specialization}</p>
          <p><strong>Email:</strong> {doctor.email}</p>
          <p><strong>Phone:</strong> {doctor.phone}</p>

          <h2 className="mt-6 text-xl font-semibold">Book Appointment</h2>
          <AppointmentForm doctorId={doctorId} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
