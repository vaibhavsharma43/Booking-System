import mongoose from "mongoose";
const timeSlotSchema = new mongoose.Schema(
  {
    start: { type: String, required: true },
    end: { type: String, required: true },
    active: { type: Boolean, default: true }
  },
  { _id: false }
);

const extraAvailability = mongoose.Schema({
doctorId:{type:mongoose.Schema.Types.ObjectId,ref:"Doctor"},
extraAvailability:[timeSlotSchema]
})
export default mongoose.models.extraAvailability || mongoose.model("ExtraAvailability",extraAvailability);