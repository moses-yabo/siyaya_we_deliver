import express from "express";
import {config} from "dotenv";
import mongoose from "mongoose";
import { QuanterMiddlewares } from "./middlware/globalMiddleware";
import  RoutesHandler from "./routes/RouteHandler";


class ServerEntryPoint {
  private app: express.Application;
  private port: number | string;
  protected middleware:QuanterMiddlewares;
  protected routes:void;

  constructor() {
    config();
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
    const Db_URL = process.env?.DB_URL as string;
     
        await mongoose.connect(Db_URL)
        .then(()=>{
          console.log("DB Connected");
        })
        .catch((err:Error)=>{
              console.log(err);
        });
        
        

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
