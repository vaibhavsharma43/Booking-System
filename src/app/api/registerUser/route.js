import { connectDB } from "@/lib/db";
import User from "@/app/models/user";

export async function POST(request) {
    await connectDB();

    const { name, email, phone, password } = await request.json();

    if (!name || !phone || !password) {
        return Response.json({ error: "All required fields must be filled." }, { status: 400 });
    }

    let existingUser = await User.findOne({ email }); 

    if (existingUser) {
        return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const newUser = await User.create({ name, email, phone, password });

    return Response.json({ success: true, user: newUser });
}
