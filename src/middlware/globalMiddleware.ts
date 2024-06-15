import express, { Request, Response, NextFunction } from "express";
import path from "path";
import swaggerDocumentation from '../utils/swaggerDefinition';
import swaggerUI from "swagger-ui-express";


export class QuanterMiddlewares {
   private app:express.Router;
   private port:number;

    constructor(_app:express.Router,_port:number){
            this.app = _app;
            this.port = _port;
            this.configureMiddleware();

    }
   
      private configureMiddleware() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(this.getRequestTime());
         // SWAGGER PAGE
        this.app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
        // DOCS IN JSON FORMAT
        this.app.get("/docs.json", (req: Request, res: Response) => {
          res.setHeader("Content-Type", "application/json");
          res.send(swaggerDocumentation);
        });
      };

      private getRequestTime() {
        return (req: Request, res: Response, next: NextFunction) => {
          console.log(`the request was at ${Date()}`);
          next();
        };
      };
}