import mongoose from "mongoose";
const unavailabilitySchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
 date:{
    type:Date
 },
 active:{
   type:Boolean,
   default:true
 }

});
unavailabilitySchema.index({date:1});
export default mongoose.models.Unavailability || mongoose.model("Unavailability",unavailabilitySchema);