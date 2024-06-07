import mongoose,{ Schema} from "mongoose";
import { Trailer,Trailer_Hire } from "../types/trailerTypes";


const TrailerSchema:Schema<Trailer> = new mongoose.Schema({
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
    required:[false,"trailer description"]
},
capacity:{
    type:Schema.Types.String,
    required:[true,"how big or small the traiiler ex: Xsmall , Medium , Large"]
},
fleet_no:{
    type:String,
    minlength:10,
    max:35,
    required:[true,"fleet_no is required"]
},
isAvailable:{
    type:Boolean,
    required:[true,"Is the trailer available"]
},
isRented:{
    type:Boolean,
    required:[true,"is the trailer rented ?"]
}

});





const trailerModel = mongoose.model<Trailer>("Trailers",TrailerSchema);
export default trailerModel;