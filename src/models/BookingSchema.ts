import mongoose,{ Schema} from "mongoose";
import { TaxiBooking,Book_Taxi } from "../types/taxiTypes";


const TaxiBookingSchema:Schema<TaxiBooking> = new mongoose.Schema({

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
    required:[true,"Pick up time is a required field"]
},
fare:{
    type:Number,
    min:10,
    max:8000,
    required:[true,"fare is a required field"]
},
tripType:{
    type:String,
    enum:Object.values(Book_Taxi),
    required:[true,"TripType is a required field"]
},
number_of_passengers:{
    type:Number,
    min:1,
    max:500,
    required:[true,"No of passengers 1 is the default"]
}

});





const taxiBookingModel = mongoose.model<TaxiBooking>("Bookings",TaxiBookingSchema);
export default taxiBookingModel;