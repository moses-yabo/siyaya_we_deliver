import {Request,Response,NextFunction  } from "express";
import { logger } from "../utils/logger";
import { sendResponse } from "./responseMiddleware";

export const NotFoundErrorHandler = (req:Request,res:Response,next:NextFunction)=>{
    const url:string = req.originalUrl;
    const time = new Date().toISOString();
    logger.error(` Path ${url} at ${time} Does not exist !`);
    sendResponse(res,404,`Path ${url} at ${time} Does not exist !`);
    
};