import mongoose from "mongoose";
import Doctor from "./app/models/doctor.js"
import User from "./app/models/user.js";
import Appointment from "./app/models/appointment.js";
import dotenv from 'dotenv';
dotenv.config();


async function connectDB(params) {
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
          console.log('✅ MongoDB connected');

    }
    catch(err){
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    }
    
}

async function seed() {
    await connectDB();
  
    try {
      // Clear existing
      await Doctor.deleteMany({});
      await User.deleteMany({});
      await Appointment.deleteMany({});
  
      // Add Doctors
      const doctors = await Doctor.insertMany([
        {
          name: "Dr. Anjali Sharma",
          specialization: "Cardiologist",
          email: "anjali.sharma@example.com",
          phone: "+91-9876543210",
        },
        {
          name: "Dr. Raj Malhotra",
          specialization: "Neurologist",
          email: "raj.malhotra@example.com",
          phone: "+91-9876543211",
        },
      ]);
  
      // Add Users
      const users = await User.insertMany([
        {
          name: "John Doe",
          email: "john@example.com",
          phone: "+91-9999999999",
        },
        {
          name: "Alice Singh",
          email: "alice@example.com",
          phone: "+91-8888888888",
        },
      ]);
  
      // Add Appointments
      await Appointment.insertMany([
        {
          doctorId: doctors[0]._id,
          userId: users[0]._id,
          date: "2025-04-15",
          slot: "10:00",
          status: "booked",
        },
        {
          doctorId: doctors[1]._id,
          userId: users[1]._id,
          date: "2025-04-15",
          slot: "11:30",
          status: "booked",
        },
      ]);
  
      console.log("✅ Seeding done");
    } catch (err) {
      console.error("❌ Seeding error:", err);
    } finally {
      await mongoose.disconnect();
    }
  }
  
  seed();