import { Response } from "express";

export const sendResponse = (res:Response,status:number,message:string,data?:any):void=>{
    res.status(status).json({status,message,data})
};
