import { Document } from "mongoose";

export enum Product_shipping{
    LOCAL_TRIP = "LOCAL_TRIP",
    NATIONAL_TRIP = "NATIONAL_TRIP",
} 

export  interface shipping_Type extends Document{
    trip_type:Product_shipping.LOCAL_TRIP|Product_shipping.NATIONAL_TRIP,
    fleet:String|Number,
    taxi_owner:String,
    taxi_driver:String,
    departure:String,
    destination:String
    time_stamp:Date | String

}

export  interface Products extends Document{
  item_name: String;
  description: String;
  price: Number;
  category: String;
  inStock: Number;
  imageUrl: String;
}
