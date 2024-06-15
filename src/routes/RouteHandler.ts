import { Application } from "express";
import { rentalRouter} from "./rentTrailerRoutes";
import {shippRouter}  from "./ShippingRoutes";
import {bookRouter} from "./bookTaxiRoutes";
import {} from "./TaxiRoutes";



function RoutesMountPoint(app:Application) {
app.use("/api/books",bookRouter);
app.use("/api/shipp",shippRouter);
app.use("/api/rent",rentalRouter);
app.use("/api/taxi",rentalRouter);
}
export default RoutesMountPoint;