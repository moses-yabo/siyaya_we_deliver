import { Request,Response,NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import { sendResponse } from "./responseMiddleware";
export const validateObjectId = (param_id:string)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        const id = req.params[param_id];
        
        if(!isValidObjectId(id)){
            sendResponse(res,400,`Invalid ID ${id}`);
            return;
        }
        next();
    }
}

