import { connectDB } from "@/lib/db";
import ExtraAvailability from "@/app/models/extraAvailability";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        const { doctorId, date, slots, active } = body;

        // ✅ Validate required fields
        if (!doctorId || !date || !slots || typeof active === 'undefined') {
            return NextResponse.json(
                { error: "All fields (doctorId, date, slots, active) are required." },
                { status: 400 }
            );
        }

        const formattedDate = new Date(date);

        const response = await ExtraAvailability.create({
            doctorId,
            date: formattedDate,
            slots,
            active,
        });

        return NextResponse.json(response);

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
