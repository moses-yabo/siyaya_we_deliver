import mongoose,{ Schema} from "mongoose";
import { TaxiBooking,Book_Taxi,ITaxiBooking } from "../types/taxiTypes";


const TaxiBookingSchema:Schema<ITaxiBooking> = new mongoose.Schema({

pickupLocation:{
    type:String,
    minlength:3,
    maxlength:250,
    required:[true,"Pickup Location is a required field"]
},
dropoffLocation:{
    type:String,
    minlength:3,
    maxlength:250,
    required:[true,"Drop off location date is a required field"]
},
pickupTime:{
    type:Schema.Types.Date,
    required:[true,"Pick up time is a required field"],
    validate:(value:Date)=> value > new Date()
},
fare:{
    type:Number,
    min:[10, "Fare must be at least 10"],
    max:[8000, "Fare must be less than 8000"],
    required:[true,"fare is a required field"]
},
tripType:{
    type:String,
    enum:{
        values:Object.values(Book_Taxi),
        message:`Trip typr must be one of: ${Object.values(Book_Taxi).join(", ")}`
    },
    required:[true,"TripType is a required field"]
},
number_of_passengers:{
    type:Number,
    min:1,
    max:500,
    required:[true,"No of passengers 1 is the default"],
    default:1
}
}
,{
    timestamps:true
});

TaxiBookingSchema.virtual('formattedFare').get(function(){
    const fare:number | string = Number(this.fare).toFixed(2);
    return `R${fare}`
});

TaxiBookingSchema.methods.calculateEstimatedArrivalTime = function():Date{
    const travelTimeInMinutes = 30;
    return new Date(this.pickupTime.getTime() + travelTimeInMinutes * 60000);
}





const taxiBookingModel = mongoose.model<TaxiBooking>("Bookings",TaxiBookingSchema);
export default taxiBookingModel;