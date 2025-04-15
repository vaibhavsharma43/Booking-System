import mongoose, { Types } from "mongoose";
const  timeslotSchema = new mongoose.Schema(
    {
        start:{type:String,required:true},
        end:{type:String,required:true}
    },
    {
        _id:false
    }
);

const availabilitySchema= new mongoose.Schema({

    doctorId:{type:mongoose.Schema.Types.ObjectId,ref:"Dcotor",require:true},
    day:{
        type:String,
        enum:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        require:true
    },
    availableSlots:[timeslotSchema], 
    unavailableSlots:[timeslotSchema],
    updatedAt:{
        type:Date,
        default:Date.now
    }
},
{
    timestamps:true
})
availabilitySchema.index({doctorId:1,day:1},{unique:true});
export default mongoose.models.availabilitySchema || mongoose.model("Availability",availabilitySchema);
