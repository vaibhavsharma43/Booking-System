import { connectDB } from '@/lib/db';
import Doctor from '@/app/models/doctor'; 
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, specialization } = body;

    // ✅ Basic validation
    if (!name?.trim() || !specialization?.trim()) {
      return NextResponse.json(
        { error: 'Both name and specialization are required.' },
        { status: 400 }
      );
    }

    const response = await Doctor.create({ name: name.trim(), specialization: specialization.trim() });

    return NextResponse.json({ success: true, doctor: response });

  } catch (error) {
    console.error('Error creating doctor:', error.message);
    return NextResponse.json({ error: 'Unable to create doctor' }, { status: 500 });
  }
}
