import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import swaggerDocumentation from '../openApi.json';
import swaggerUI from "swagger-ui-express";
import { logger } from "../utils/logger";
import bookingRouter from "../routes/bookTaxiRoutes";
import shippRouter from "../routes/ShippingRoutes";
import rentalRouter from "../routes/rentTrailerRoutes";
import taxiRouter from "../routes/TaxiRoutes";
import userRouter from "../routes/UserRoutes";
import productRouter from "../routes/ProductsRoutes";
import trailerRouter from "../routes/TrailersRoutes";
import { errorHandler } from "./errorHandler";
import { NotFoundErrorHandler } from "./notFoundHandler";


export class QuanterMiddlewares {
   private app:express.Application;
   private port:number;

    constructor(_app:express.Application,_port:number){
            this.app = _app;
            this.port = _port;
            this.configureMiddleware();

    }
   
      private configureMiddleware() {
       
        const options = {explorer: true};

        if (process.env.NODE_ENV === "development") {
          
          this.app.use(this.getRequestTime);         
          this.app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation,options));
          this.app.get("/docs.json", (req: Request, res: Response) => {
            res.setHeader("Content-Type", "application/json");
            res.send(swaggerDocumentation);
          });
        }

        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(cors({origin:"*"}));
        this.app.use("/api/books",bookingRouter);
        this.app.use("/api/shipp",shippRouter);
        this.app.use("/api/rent",rentalRouter);
        this.app.use("/api/taxi",taxiRouter);
        this.app.use("/api/users",userRouter);
        this.app.use("/api/trailer",trailerRouter);
        this.app.use("/api/product",productRouter);
        this.app.use(NotFoundErrorHandler);
        this.app.use(errorHandler);
        
      };

      private getRequestTime = (req: Request, res: Response, next: NextFunction):void => {
        logger.info(`Received a ${req.method} Http method from ${req.url} at ${ new Date().toISOString()}`);
        next();
      };

}