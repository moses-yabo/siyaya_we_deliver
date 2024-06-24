import mongoose,{ Schema} from "mongoose";
import { shipping_Type,Product_shipping} from "../types/productsTypes";


const ShippingSchema: Schema<shipping_Type> = new Schema({
    trip_type: {
        type: String,
        enum: Object.values(Product_shipping),
        required: [true, "TripType is a required field"]
    },
    fleet: {
        type: String,
        minlength: 4,
        maxlength: 24,
        required: [true, "Fleet is a required field"]
    },
    taxi_driver: {
        type: String,
        minlength: 5,
        maxlength: 25,
        required: [true, "Taxi driver is a required field"]
    },
    taxi_owner: {
        type: String,
        minlength: 5,
        maxlength: 25,
        required: [true, "Taxi owner is a required field"]
    },
    departure: {
        type: String,
        minlength: 5,
        maxlength: 25,
        required: [true, "Departure is a required field"]
    },
    destination: {
        type: String,
        minlength: 5,
        maxlength: 16,
        required: [true, "Destination is a required field"]
    }
},{
    timestamps:true
}
);

const shippingModel = mongoose.model<shipping_Type>("Shipping",ShippingSchema)
export default shippingModel<shipping_Type>;


