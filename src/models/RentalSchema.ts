import { Schema,model} from "mongoose";
import {TrailerBooking,Trailer_Hire } from "../types/trailerTypes";

const RentalSchema: Schema<TrailerBooking> = new Schema({
    startDate: {
      type: Date,
      required: [true, "Start date is a required field"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is a required field"],
    },
    totalCost: {
      type: Number,
      required: [true, "Total cost is a required field"],
    },
    tripType: {
      type: String,
      enum: Object.values(Trailer_Hire),
      required: [true, "Trip type is a required field"],
    },
    destination: {
      type: String,
      minlength: 4,
      maxlength: 100,
      required: [true, "Destination is a required field"],
    },
    duration: {
      type: Number,
      required: [true, "Duration is a required field"],
      min: [1, "Duration must be at least 1 day"], 
    },
  },{
    timestamps:true
  }
);
 

const trailerModel = model<TrailerBooking>("TrailerHiring",RentalSchema);
export default trailerModel;


