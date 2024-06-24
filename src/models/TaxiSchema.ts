import mongoose,{ Schema} from "mongoose";
import { Taxi } from "../types/taxiTypes";


const TaxiSchema: Schema<Taxi> = new Schema({
    imgUrl: {
        type: mongoose.Schema.Types.Buffer, // Assuming imgUrl can be Buffer or String
        minlength: 3,
        maxlength: 250,
        required: [false, "Image of the taxi"]
    },
    description: {
        type: String,
        minlength: 8,
        maxlength: 250,
        required: [true, "Description is a required field"]
    },
    capacity: {
        type: String, 
        required: [true, "Capacity is a required field"]
    },
    fleet_no: {
        type: String,
        minlength: 10,
        maxlength: 35,
        required: [true, "Fleet number is a required field"]
    },
    isAvailable: {
        type: Boolean,
        required: [true, "Availability status is a required field"]
    },
    isBooked: {
        type: Boolean,
        required: [true, "Booking status is a required field"]
    }
});




const taxiModel = mongoose.model<Taxi>("Taxi",TaxiSchema);
export default taxiModel;