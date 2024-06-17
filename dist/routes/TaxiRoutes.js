"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TaxiController_1 = require("../controllers/TaxiController");
const { get_all_available_taxi, get_taxi_by_id, add_taxi, updateOne_taxi, updateMany_taxi, remove_taxi } = TaxiController_1.taxiController;
class TaxiRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .route("/")
            .get(get_all_available_taxi)
            .post(add_taxi);
        this.router
            .route("/:taxi_id")
            .get(get_taxi_by_id)
            .put(updateMany_taxi)
            .patch(updateOne_taxi)
            .delete(remove_taxi);
    }
}
const taxiRouter = new TaxiRouter().router;
exports.default = taxiRouter;
