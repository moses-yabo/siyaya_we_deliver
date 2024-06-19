import express, { Request, Response, NextFunction } from "express";
import errorHandler ,{LoggingCallback}from "errorhandler";
import notifier from "node-notifier";
import swaggerDocumentation from '../openApi.json';
import swaggerUI from "swagger-ui-express";
import { CustomError} from "../utils/CustomErrorHandling";
import bookingRouter from "../routes/bookTaxiRoutes";
import shippRouter from "../routes/ShippingRoutes";
import rentalRouter from "../routes/rentTrailerRoutes";
import taxiRouter from "../routes/rentTrailerRoutes";
import userRouter from "../routes/UserRoutes";
import productRouter from "../routes/ProductsRoutes";
import trailerRouter from "../routes/TrailersRoutes";


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
          this.app.use(errorHandler({log:this.errorNotification}));
          this.app.use(this.getRequestTime);
         
          // SERVE SWAGGER DOCUMENT
          this.app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation,options));
          // DOCS IN JSON FORMAT
          this.app.get("/docs.json", (req: Request, res: Response) => {
            res.setHeader("Content-Type", "application/json");
            res.send(swaggerDocumentation);
          });
        }
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use("/api/books",bookingRouter);
        this.app.use("/api/shipp",shippRouter);
        this.app.use("/api/rent",rentalRouter);
        this.app.use("/api/taxi",taxiRouter);
        this.app.use("/api/users",userRouter);
        this.app.use("/api/trailer",trailerRouter);
        this.app.use("/api/product",productRouter);
      };

      private getRequestTime = (req: Request, res: Response, next: NextFunction):void => {
        console.log(`Received a ${req.method} Http method at ${ new Date().toISOString()}`);
        next();
      };
      private errorNotification:LoggingCallback = ()=>{
        
        return (err:Error ,str:string,req: Request) => {
                  
          const title = `Error in ${req.method} ${req.url}`;
          notifier.notify({
            title,
            message:str
          });
        
          // if (res.headersSent) { return next(err); }
          
          // let statusCode = 500;
          // if(err instanceof CustomError){statusCode = err.statusCode};
          // res.status(statusCode).json({error:err.message});
};
      }
    
}