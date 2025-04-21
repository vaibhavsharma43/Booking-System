import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema(
  {
    start: { type: String, required: true },  // e.g., "10:00"
    end: { type: String, required: true },    // e.g., "10:30"
    active: { type: Boolean, default: true }
  },
  { _id: false }
);

const extraAvailabilitySchema = new mongoose.Schema({
  doctorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Doctor", 
    required: true 
  },
  date: { 
    type:Date,  
    required: true 
  },
  slots: [timeSlotSchema],
  active: { type: Boolean, default: true }
});

extraAvailabilitySchema.index({date:1});
export default mongoose.models.ExtraAvailability || mongoose.model("ExtraAvailability", extraAvailabilitySchema);
