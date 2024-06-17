import express from "express";
import {config} from "dotenv";
import mongoose from "mongoose";
import { QuanterMiddlewares } from "./middlware/globalMiddleware";


class ServerEntryPoint {
  private app: express.Application;
  private port: number | string;
  protected middleware:QuanterMiddlewares;
 

  constructor() {
    config();
    this.app = express();
    this.port = process.env.PORT as string | number;
    this.middleware = new QuanterMiddlewares(this.app,<number>this.port)
    

    try {
      this.configureDbConnection();  
    } catch (error) {
      console.log(error);
      
    }

  }


  private async configureDbConnection() {
    const Db_URL = process.env?.DB_URL as string;
    const DB_PASSWORD = process.env?.DB_PASSWORD as string
    mongoose.set('strictQuery', false);

    await mongoose.connect(Db_URL.replace("<password>",DB_PASSWORD))
    .then(()=>{
          console.log("DB Connected");
        })
    .catch((err:Error)=>{
              console.log(err?.message);
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
