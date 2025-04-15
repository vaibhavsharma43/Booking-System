import mongoose from "mongoose";
const appointmentSchema = new mongoose.Schema({
    doctorId:{type:mongoose.Schema.Types.ObjectId,ref:"Doctor"},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    date:String,
    slot:String,
    status:String
});
export default mongoose.models.Appointment || mongoose.model("Appointment",appointmentSchema);