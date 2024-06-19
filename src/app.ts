import express from "express";
import {config} from "dotenv";
import { QuanterMiddlewares } from "./middlware/middlewareConfig";
import DbContext from "./Db/DbContext";

class ServerEntryPoint {
  private app: express.Application;
  private port: number | string;
 

  constructor() {
    config();
    DbContext();
    this.app = express();
    this.port = process.env.PORT as string | number;
    this.configureMiddlewares();
    
    
  }

  private configureMiddlewares():void{
    new QuanterMiddlewares(this.app,<number>this.port);
}
public start():void{
this.app.listen(this.port,()=> console.log(`Welcome Server is Listening on ${this.port}`));
}

}

const server:ServerEntryPoint = new ServerEntryPoint();
server.start();