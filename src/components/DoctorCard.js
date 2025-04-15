"use client";
import { useRouter } from "next/navigation";

export default function DoctorCard({ doctor }) {
  const router = useRouter();

  return (
    <div className="border p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold">{doctor.name}</h2>
      <p><strong>Specialization:</strong> {doctor.specialization}</p>
      <p><strong>Email:</strong> {doctor.email}</p>
      <p><strong>Phone:</strong> {doctor.phone}</p>
      <button
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => router.push(`/doctors/${doctor._id}`)}
      >
        Book Appointment
      </button>
    </div>
  );
}
