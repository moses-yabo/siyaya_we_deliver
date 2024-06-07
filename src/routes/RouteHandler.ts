import { Application } from "express";
import { rentalRouter} from "./rentTrailerRoutes";
import {shippRouter}  from "./ShippingRoutes";
import {bookRouter} from "./bookTaxiRoutes";



function RoutesMountPoint(app:Application) {
app.use("/api/books",bookRouter);
app.use("/api/shipp",shippRouter);
app.use("/api/rent",rentalRouter);
}
export default RoutesMountPoint;