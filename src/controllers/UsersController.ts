import { RequestHandler} from "express";
import { IUserController } from "../types/userControllerType";
import {IUser} from "../types/userTypes";
import UserModel from "../models/UserSchema";
import { sendResponse } from "../middlewares/responseMiddleware";
import { CustomError } from "../utils/CustomErrorHandling";
import mongoose from "mongoose";
class UserController implements IUserController<RequestHandler> {
    
    public get_all_available_users: RequestHandler = async (req, res) => {
      try {
        const users: IUser[] = await UserModel.find({});
        if (users.length === 0) return sendResponse(res,404,"Users Not Found!");
        sendResponse(res,200,"success !!",users);
      } catch (error) {
        if (error instanceof CustomError) {
            sendResponse(res,error.statusCode,error.message);
        }
      }
    }

  
    public get_user_by_id: RequestHandler = async (req, res) => {
      try {
        const user_id = req.params["user_id"];
        const user = await UserModel.findById(user_id);
        
        if (!user) return sendResponse(res,404,"user not found",user);
        sendResponse(res,200,"success",user);

      } catch (error) {
        if (error instanceof CustomError) {
            sendResponse(res,error.statusCode,error.message);
        }
      }
    }
  
    public add_user: RequestHandler = async (req, res) => {
      try {
        const { email } = req.body;
        const user_email = await UserModel.find({ email: email });
      
        if (user_email.length > 0) return sendResponse(res,409,"user email has already been registered as a user");
        const user = await UserModel.create(req.body);
  
        return sendResponse(res,200,"Created a user",user);
      } catch (error) {
        if(error instanceof mongoose.Error.ValidationError){
          return sendResponse(res, 400, error.message);
        }
       else if (error instanceof CustomError) {
          return sendResponse(res,error.statusCode,error.message);
        }; 
        
        return sendResponse(res,500, "Failed to create a user");
      }
    }
  
    public updateOne_user: RequestHandler = async (req, res): Promise<void> => {
      try {
        const user_id = req.params["user_id"];  
        const user = await UserModel.findOneAndUpdate({ _id: user_id }, { $set: req.body }, { new: true });
  
        if (!user) {
            sendResponse(res,404,"user not found!");
          return;
        }
       sendResponse(res,200,"Success!",user);
      } catch (error) {
        if (error instanceof CustomError) {
            sendResponse(res,error.statusCode,error.message);
        }
       
      }
    }
  
    public updateMany_user: RequestHandler = async (req, res) => {
      try {
        const user_id = req.params["user_id"];
        const user = await UserModel.updateOne({ _id: user_id }, { $set: req.body });
        if (user.modifiedCount === 0) {
            sendResponse(res, 404, "User not found. Updating users failed.");
          return;
        }
        sendResponse(res,200,"success! user is updated",user)
      } catch (error) {
        if (error instanceof CustomError) {
            sendResponse(res,error.statusCode,error.message)
        }
      }
    }
  
    public remove_user: RequestHandler = async (req, res) => {
      try {
        const user_id = req.params["user_id"];
        const user = await UserModel.deleteOne({ _id: user_id });
        if (user.deletedCount === 0) {
            sendResponse(res,404,"User not found");
          return;
        }
        sendResponse(res,204,"success in deletion of a doc!",user);
      } catch (error) {
        if (error instanceof CustomError) {
            sendResponse(res,error.statusCode,error.message);
        }
      }
    }
  };
  
  export const userController = new UserController();