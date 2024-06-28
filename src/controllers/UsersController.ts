import { RequestHandler} from "express";
import mongoose from "mongoose";
import { logger } from "../utils/logger";
import { IUserController } from "../types/userControllerType";
import {IUser} from "../types/userTypes";
import { UserServices } from "../services/user.service";
import { IUserService } from "../types/IUserService";
import UserModel from "../models/UserSchema";
import { sendResponse } from "../middlewares/responseMiddleware";
import { AppError } from "../utils/AppErrorHandling";
import { resourceNotFound } from "../utils/resourceNotFound";
class UserController implements IUserController<RequestHandler> {
    private readonly _userServices: IUserService<IUser>= new UserServices();
    private readonly USERS = "Users";
    public get_all_available_users: RequestHandler = async (req, res) => {
      try {
        const users: IUser[] = await this._userServices.getAllUsers();
        if (users.length === 0) {
          logger.error("Users Not Found!");
          return resourceNotFound(this.USERS);
        };
        logger.info("Fetched users");
        sendResponse(res,200,"success !!",users);
      } catch (error) {
        if (error instanceof AppError) {
          logger.error(error.message);
            sendResponse(res,error.statusCode,error.message);
        }
      }
    }

  
    public get_user_by_id: RequestHandler = async (req, res) => {
      try {
        const user_id = req.params["user_id"];
        const user = await UserModel.findById(user_id);
        
        if (!user) {
          logger.error("user not found");
          return resourceNotFound(this.USERS);
        };
        logger.info("Fetched a user");
        sendResponse(res,200,"success",user);

      } catch (error) {
        if (error instanceof AppError) {
          logger.error(error.message);
            sendResponse(res,error.statusCode,error.message);
        }
      }
    }
  
    public add_user: RequestHandler = async (req, res) => {
      try {
        const { email } = req.body;
        const user_email = await UserModel.find({ email: email });
      
        if (user_email.length > 0) {
          logger.error("user email has already been registered as a user");
          return sendResponse(res,409,"user email has already been registered as a user");
        };
        const user = await UserModel.create(req.body);
        logger.info("Created a user");
        return sendResponse(res,201,"Created a user",user);
      } catch (error) {
        if(error instanceof mongoose.Error.ValidationError){
          logger.error(error.message);
          return sendResponse(res, 400, error.message);
        }
       else if (error instanceof AppError) {
          logger.error(error.message);
          return sendResponse(res,error.statusCode,error.message);
        }; 
        logger.error("Failed to create a user");
        return sendResponse(res,500, "Failed to create a user");
      }
    }
  
    public updateOne_user: RequestHandler = async (req, res): Promise<void> => {
      try {
        const user_id = req.params["user_id"];  
        const user = await UserModel.findOneAndUpdate({ _id: user_id }, { $set: req.body }, { new: true });
  
        if (!user) {
          logger.error("user not found!");
            resourceNotFound(this.USERS);
          return;
        }
        logger.info("Update a user");
       sendResponse(res,200,"Success!",user);
      } catch (error) {
        if (error instanceof AppError) {
          logger.error(error.message); 
          sendResponse(res,error.statusCode,error.message);
        }
       
      }
    }
  
    public updateMany_user: RequestHandler = async (req, res) => {
      try {
        const user_id = req.params["user_id"];
        const user = await UserModel.updateOne({ _id: user_id }, { $set: req.body });
        if (user.modifiedCount === 0) {
            logger.error("User not found. Updating users failed.");
            resourceNotFound(this.USERS);
          return;
        }
        logger.info("Updated a user");
        sendResponse(res,200,"success! user is updated",user)
      } catch (error) {
        if (error instanceof AppError) {
            logger.error(error.message);
            sendResponse(res,error.statusCode,error.message)
        }
      }
    }
  
    public remove_user: RequestHandler = async (req, res) => {
      try {
        const user_id = req.params["user_id"];
        const user = await UserModel.deleteOne({ _id: user_id });
        if (user.deletedCount === 0) {
            logger.error("User not found");
            resourceNotFound(this.USERS);
          return;
        }
        logger.info("success in deletion of a user doc!");
        sendResponse(res,204,"success in deletion of a user doc!",user);
      } catch (error) {
        if (error instanceof AppError) {
            logger.error(error.message);
            sendResponse(res,error.statusCode,error.message);
        }
      }
    }
  };
  
  export const userController = new UserController();