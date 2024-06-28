import { Response } from "express";

export const sendResponse = (res:Response,status:number,message:string,data?:any):void=>{
    if (res.headersSent) return;
    res.status(status).json({status,message,data});
};
