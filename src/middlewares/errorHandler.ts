import { NextFunction, Request,Response } from "express";
import {logger } from "../utils/logger";
import { AppError } from "../utils/AppErrorHandling";
import { sendResponse } from "./responseMiddleware";

export const errorHandler = (error:AppError,req:Request,res:Response,next:NextFunction)=>{
    const {name,message,statusCode} = error; 
    const status = statusCode || 500;
    const msg = message || "Internal Server Error !";
    const stack = process.env.NODE_ENV === "production" ? null : error.stack;
    logger.info(`{
        name: ${name},
        message: ${msg},
        status: ${status},
        stack: ${stack}
        }`);
        sendResponse(res,status,msg,stack);

    
}