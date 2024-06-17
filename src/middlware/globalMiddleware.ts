import express, { Request, Response, NextFunction } from "express";
import swaggerDocumentation from '../openApi.json';
import swaggerUI from "swagger-ui-express";
import bookingRouter from "../routes/bookTaxiRoutes";
import shippRouter from "../routes/ShippingRoutes";
import rentalRouter from "../routes/rentTrailerRoutes";
import taxiRouter from "../routes/rentTrailerRoutes";
import userRouter from "../routes/UserRoutes";
import productRouter from "../routes/ProductsRoutes";
import trailerRouter from "../routes/TrailersRoutes";


export class QuanterMiddlewares {
   private app:express.Router;
   private port:number;

    constructor(_app:express.Router,_port:number){
            this.app = _app;
            this.port = _port;
            this.configureMiddleware();

    }
   
      private configureMiddleware() {
       
        const options = {
          explorer: true
        };
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(this.getRequestTime());
        this.app.use("/api/books",bookingRouter);
        this.app.use("/api/shipp",shippRouter);
        this.app.use("/api/rent",rentalRouter);
        this.app.use("/api/taxi",taxiRouter);
        this.app.use("/api/users",userRouter);
        this.app.use("/api/trailer",trailerRouter);
        this.app.use("/api/product",productRouter);
        
        // SWAGGER PAGE
        this.app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation,options));
        // DOCS IN JSON FORMAT
        this.app.get("/docs.json", (req: Request, res: Response) => {
          res.setHeader("Content-Type", "application/json");
          res.send(swaggerDocumentation);
        });
      };

      private getRequestTime() {
        return (req: Request, res: Response, next: NextFunction) => {
          console.log(`Received a ${req.method} Http method at ${Date()}`);
          next();
        };
      };
}