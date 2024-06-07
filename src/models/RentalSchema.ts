import { Schema,model} from "mongoose";
import {TrailerBooking,Trailer_Hire } from "../types/trailerTypes";
const {Date,String,Number} = Schema.Types;

const RentalSchema:Schema<TrailerBooking> = new Schema({
   
    startDate: {
        type:Date,
        required:[true,"start date is a required field"]
    },
    endDate: {
        type:Date,
        required:[true,"End date is a required field"]
    },
    totalCost: {
        type:Number,
        required:[true,"totalCost is a required field"]
    },
    tripType:{
        type:String,
        enum:Object.values(Trailer_Hire),
        required:[true,"triptype is a requires field"]
    },
    destination:{
        type:String,
        minlength:4,
        maxlength:20,
        required:[true,"destination is a requires field"]
    },
    time_stamp:{
        type:Date,
        required:[true,"time date is a requires field"]
    },
    duration:{
        type:Number,
        required:[true,"Duration date is a requires field"]
    }
});
 

const trailerModel = model<TrailerBooking>("TrailerHiring",RentalSchema);
export default trailerModel;


