import { RequestHandler} from "express";
import {IUser} from "../types/userTypes";
import UserModel from "../models/UserSchema";
import { ObjectId } from "mongoose";
import { isValidObjectId } from "mongoose";

class UserController {
    
    public get_all_available_users: RequestHandler = async (req, res) => {
      try {
        const users: IUser[] = await UserModel.find({});
        if (users.length === 0) return res.status(404).json({ status: "Users Not Found!", code: 404 });
        
        res.status(200).json({ status: "success !!", data: users });
      } catch (error) {
        res.status(500).json({ status: "Internal Server Error", msg: error });
      }
    }
  
    public get_user_by_id: RequestHandler = async (req, res) => {
      try {
        const user_id = req.params["user_id"];
        if (!isValidObjectId(user_id)) return res.status(400).json({ status: "failed", message: "Invalid user ID" });
        const user = await UserModel.findById(user_id);
        
        if (!user) return res.status(404).json({ status: "user not found", data: user });
        
        res.status(200).json({ status: "success", data: user });
      } catch (error) {
        res.status(500).json({ status: "Failed", msg: "500 internal server Error", error });
      }
    }
  
    public add_user: RequestHandler = async (req, res) => {
      try {
        const { email } = req.body;
        const user_email = await UserModel.find({ email: email });
      
        if (user_email.length > 0) return res.json({ msg: "user email has already been registered as a user" });
        const user = await UserModel.create(req.body);
  
        return res.status(201).json({ message: "Created a user", status: 201, user });
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation error: " + error.message, status: 400 });
          }
          return res.status(500).json({ message: error.message, status: 500 });
        }    
        
        return res.status(500).json({ message: "Failed to create a user", status: 500 });
      }
    }
  
    public updateOne_user: RequestHandler = async (req, res): Promise<void> => {
      try {
        const user_id = req.params["user_id"];  
      
        if (!isValidObjectId(user_id)) {
          res.status(400).json({ status: "failed", message: "Invalid user ID" });
          return;
        };
      
        const user = await UserModel.findOneAndUpdate({ _id: user_id }, { $set: req.body }, { new: true });
  
        if (!user) {
          res.status(404).json({ status: "failed", msg: "user not found!" });
          return;
        }
        
        res.status(200).json({ status: "success!", data: user });
      } catch (error) {
        res.status(500).json({ status: "Internal server error", msg: error });
      }
    }
  
    public updateMany_user: RequestHandler = async (req, res) => {
      try {
        const user_id = req.params["user_id"];
      
        if (!isValidObjectId(user_id)) {
          res.status(400).json({ status: "failed", message: "Invalid user ID" });
          return;
        }
  
        const user = await UserModel.updateOne({ _id: user_id }, { $set: req.body });
        if (user.modifiedCount === 0) {
          res.status(500).json({ status: "failed updating a document", msg: "updated booking failed ..." });
          return;
        }
        
        res.status(200).json({ status: "success!" });
      } catch (error) {
        res.status(500).json({ status: "failed", msg: error });
      }
    }
  
    public remove_user: RequestHandler = async (req, res) => {
      try {
        const user_id = req.params["user_id"];
        
        if (!isValidObjectId(user_id)) {
          return res.status(400).json({ status: "failed", message: "Invalid user ID" });
        }
  
        const user = await UserModel.deleteOne({ _id: user_id });
        if (user.deletedCount === 0) {
          res.status(404).json({ status: "Failed", message: "User not found" });
          return;
        }
  
        res.status(204).json({ status: "success in deletion of a doc!" });
      } catch (error) {
        res.status(500).json({ status: "Internal Server Error", msg: error });
      }
    }
  };
  
  export const userController = new UserController();