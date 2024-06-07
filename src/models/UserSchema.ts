import mongoose,{ Schema} from "mongoose";
import { IUser,User_roles } from "../types/userTypes";


const userSchema:Schema<IUser> = new mongoose.Schema({
    _id:{
        type:Schema.Types.ObjectId
    },
    firstName:{
        type:String ,
          minlength:3,
          maxlength:22
        },
    lastName:{
        type:String,
        required:[true,"Last name is Required "],
         minlength:3,
         maxlength:22
        },
    user_name:{
        type:String,
        required:[true,"user name is required"]
    },
    email:{
        type:String,
        required:[true,"email is required !"],
        unique:true,
        lowercase:true,

        },
        password:{
            type:String,
            minlength:[8,"minimum is 8 characters"],
            maxlength:[250,"maximum is 250 characters"],
            required:[true,"password is a required field"]
        },
        role:{
            type:String,
            enum:Object.values(User_roles),
            default:User_roles.ADMIN
        }




});

 const  userModel = mongoose.model<IUser>("Users",userSchema);
 export default userModel;


