import { connectDB } from '@/lib/db';
import Doctor from '@/app/models/doctor'; 

export async function GET(req) {

  try {
    await connectDB();
    const doctors = await Doctor.find({});
    return Response.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return Response.json({ error: 'Unable to fetch doctors' }, { status: 500 });
  }
}
