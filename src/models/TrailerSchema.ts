import mongoose,{ Schema} from "mongoose";
import { Trailer} from "../types/trailerTypes";


const TrailerSchema:Schema<Trailer> = new Schema({
    imgUrl: {
        type: mongoose.Schema.Types.Buffer,
        required: [false, "Image of the trailer"]
    },
    description: {
        type: String,
        minlength: 8,
        maxlength: 250,
        required: [false, "Trailer description"]
    },
    capacity: {
        type: String,
        required: [true, "Trailer capacity is required"]
    },
    fleet_no: {
        type: String,
        minlength: 10,
        maxlength: 35,
        required: [true, "Fleet number is required"]
    },
    isAvailable: {
        type: Boolean,
        required: [true, "Availability status is required"]
    },
    isRented: {
        type: Boolean,
        required: [true, "Rental status is required"]
    }
},{
    timestamps:true
});






const trailerModel = mongoose.model<Trailer>("Trailers",TrailerSchema);
export default trailerModel;