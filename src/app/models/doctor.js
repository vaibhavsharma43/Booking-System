import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema({
    name:String,
    specialization:String,
});
export default mongoose.models.Doctor || mongoose.model("Doctor",doctorSchema)