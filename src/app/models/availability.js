import mongoose from "mongoose";

// Time slot schema
const timeSlotSchema = new mongoose.Schema(
  {
    start: { type: String, required: true },
    end: { type: String, required: true },
    active: { type: Boolean, default: true }
  },
  { _id: false }
);

// Day entry schema (only availability now)
const dayEntrySchema = new mongoose.Schema(
  {
    availability: [timeSlotSchema],
    active:{
    type:  Boolean,default:true
    }
  },
  { _id: false }
);

// Main availability schema
const availabilitySchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },
    day: {
      type: new mongoose.Schema(
        {
          Sunday: { type: dayEntrySchema, required: false },
          Monday: { type: dayEntrySchema, required: false },
          Tuesday: { type: dayEntrySchema, required: false },
          Wednesday: { type: dayEntrySchema, required: false },
          Thursday: { type: dayEntrySchema, required: false },
          Friday: { type: dayEntrySchema, required: false },
          Saturday: { type: dayEntrySchema, required: false }
        },
        { _id: false }
      ),
      required: true
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Unique index per doctor
availabilitySchema.index({ doctorId: 1 }, { unique: true });

export default mongoose.models.Availability ||
  mongoose.model("Availability", availabilitySchema);
