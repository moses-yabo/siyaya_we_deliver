import mongoose,{ Schema} from "mongoose";
import { Products} from "../types/productsTypes";


const ProductSchema: Schema<Products> = new mongoose.Schema({
    item_name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 250,
      required: [true, "Item name is a required field"],
    },
    description: {
      type: String,
      minlength: 3,
      maxlength: 250,
      trim: true,
      required: [true, "Description is a required field"],
    },
    price: {
      type: Number,
      required: [true, "Price is a required field"],
    },
    category: {
      type: String,
      required: [true, "Category is a required field"],
      trim: true,
    },
    inStock: {
      type: Number,
      required: [true, "InStock is a required field"],
    },
  }, {
    timestamps: true
  });


const ProductModel = mongoose.model<Products>("Products",ProductSchema);
export default ProductModel;