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
return mongoose.models.Unavailability || mongoose.model.Schema("Unavailability",unavailabilitySchema);