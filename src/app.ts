import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { QuanterMiddlewares } from "./middlware/globalMiddleware";
import  RoutesHandler from "./routes/RouteHandler";


class ServerEntryPoint {
  private app: express.Application;
  private port: number | string;
  protected middleware:QuanterMiddlewares;
  protected routes:void;

  constructor() {
    dotenv.config();
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.middleware = new QuanterMiddlewares(this.app,<number>this.port)
    this.routes = RoutesHandler(this.app);

    try {
      this.configureDbConnection();  
    } catch (error) {
      console.log(error);
      
    }

  }


  private async configureDbConnection() {
    
      try {
        await mongoose.connect(process.env.DB_URL ?? "uri not working");
        console.log("Db is connected...");
      } catch (error) {
        throw new Error(error as string);
      }

  }
  
  public  async start() {
    try {
       this.app.listen(this.port, () => {
        console.log(`welcome you are all listening on ${this.port}`);
      });
    } catch (error) {
      console.log(error);
      
    }
   
  }
}

const server = new ServerEntryPoint();

server.start();
