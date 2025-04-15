import { getDoctors } from "@/lib/api";
import DoctorCard from "@/components/DoctorCard";

export default async function HomePage() {
  const doctors = await getDoctors();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Doctors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
    </main>
  );
}
