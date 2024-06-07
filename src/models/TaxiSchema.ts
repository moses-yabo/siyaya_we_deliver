import mongoose,{ Schema} from "mongoose";
import { Taxi } from "../types/taxiTypes";


const TaxiSchema:Schema<Taxi> = new mongoose.Schema({
    imgUrl:{
    type:Object.values([Schema.Types.Buffer, String]),
    minlength:3,
    maxlength:250,
    required:[false,"image of the taxi"]
},
description:{
    type:String,
    minlength:8,
    maxlength:250,
    required:[true,"Drop off location date is a required field"]
},
capacity:{
    type:Schema.Types.String,
    required:[true,"Pick up time is a required field"]
},
fleet_no:{
    type:String,
    minlength:10,
    max:35,
    required:[true,"fare is a required field"]
},
isAvailable:{
    type:Boolean,
    required:[true,"TripType is a required field"]
},
isBooked:{
    type:Boolean,
    required:[true,"TripType is a required field"]
}

});





const taxiModel = mongoose.model<Taxi>("Taxi",TaxiSchema);
export default taxiModel;