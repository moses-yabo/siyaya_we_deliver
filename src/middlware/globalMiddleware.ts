import express, { Request, Response, NextFunction } from "express";
import path from "path";
import swaggerDocs from '../utils/swaggerDefinition';
import { ifError } from "assert";


export class QuanterMiddlewares {
   private app:express.Router;
   private port:number;

    constructor(_app:express.Router,_port:number){
            this.app = _app;
            this.port = _port;
            this.configureMiddleware();

    }
    private getRequestTime() {
        return (req: Request, res: Response, next: NextFunction) => {
          console.log(`the request was at ${Date()}`);
          next();
        };
      }
      private configureMiddleware() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname, "../dist/views")));
        this.app.use(this.getRequestTime());
        swaggerDocs((<express.Express>this.app), (<number>this.port));
      }
}