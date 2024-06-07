import mongoose,{ Schema} from "mongoose";
import { Products} from "../types/productsTypes";


const ProductSchema:Schema<Products> = new mongoose.Schema({

item_name:{
    type:String,
    trim:true,
    minlength:3,
    maxlength:250,
    required:[true,"Pickup Location is a required field"]
},

description:{
    type:String,
    minlength:3,
    maxlength:250,
    trim:true,
    required:[true,"Drop off location date is a required field"]
},

price:{
    type:Number,
    required:[true,"Pick up time is a required field"]
},

category:{
    type:String,
    required:[true,"category is a required field"],
    trim:true
},

inStock:{
    type:Number,
    required:[true,"inStock is a required field"]
}

});





const ProductModel = mongoose.model<Products>("Products",ProductSchema);
export default ProductModel;