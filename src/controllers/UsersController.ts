import { RequestHandler } from "express";
import { IUser } from "../types/userTypes";
import UserModel from "../models/UserSchema";
import { sendResponse } from "../middlewares/responseMiddleware";
import { CustomError } from "../utils/CustomErrorHandling";

class UserController {
  public get_all_available_users: RequestHandler = async (req, res) => {
    try {
      const users: IUser[] = await UserModel.find({});
      if (users.length === 0) return sendResponse(res, 404, "Users Not Found!");
      sendResponse(res, 200, "Success!", users);
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public get_user_by_id: RequestHandler = async (req, res) => {
    try {
      const user_id = req.params["user_id"];
      const user = await UserModel.findById(user_id);
      if (!user) return sendResponse(res, 404, "User not found");
      sendResponse(res, 200, "Success!", user);
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public add_user: RequestHandler = async (req, res) => {
    try {
      const { email } = req.body;
      const user_email = await UserModel.find({ email: email });
      if (user_email.length > 0) return sendResponse(res, 409, "User email has already been registered");

      const user = await UserModel.create(req.body);
      return sendResponse(res, 201, "Created a user", user);
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        if (error.name === 'ValidationError') {
          return sendResponse(res, error.statusCode, error.message);
        }
        return sendResponse(res, error.statusCode, error.message);
      } else {
        return sendResponse(res, 500, "Failed to create a user");
      }
    }
  }

  public updateOne_user: RequestHandler = async (req, res): Promise<void> => {
    try {
      const user_id = req.params["user_id"];
      const user = await UserModel.findOneAndUpdate({ _id: user_id }, { $set: req.body }, { new: true });
      if (!user) return sendResponse(res, 404, "User not found");

      sendResponse(res, 200, "Success! User updated", user);
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public updateMany_user: RequestHandler = async (req, res) => {
    try {
      const user_id = req.params["user_id"];
      const user = await UserModel.updateOne({ _id: user_id }, { $set: req.body });
      if (user.modifiedCount === 0) return sendResponse(res, 404, "User not found. Updating users failed.");

      sendResponse(res, 200, "Success! User updated");
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }

  public remove_user: RequestHandler = async (req, res) => {
    try {
      const user_id = req.params["user_id"];
      const user = await UserModel.deleteOne({ _id: user_id });
      if (user.deletedCount === 0) return sendResponse(res, 404, "User not found");

      sendResponse(res, 200, "Success! User deleted");
    } catch (error) {
      if (error instanceof CustomError) {
        sendResponse(res, error.statusCode, error.message);
      } else {
        sendResponse(res, 500, "Internal Server Error");
      }
    }
  }
}

export const userController = new UserController();
