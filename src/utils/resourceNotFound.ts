import { Request,Response,NextFunction } from "express"
import { logger } from "../utils/logger";
import { sendResponse } from "../middlewares/responseMiddleware";
export const resourceNotFound = (resourceName:string)=>{
    return (req:Request, res:Response,next:NextFunction):void=>{
        const message =`${resourceName} is not Found 😭`;
        logger.error(message);
        sendResponse(res,404,message);
        next
    }
} 