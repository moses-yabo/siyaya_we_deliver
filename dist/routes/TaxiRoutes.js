"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TaxiController_1 = require("../controllers/TaxiController");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
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
            .get((0, validationMiddleware_1.validateObjectId)("taxi_id"), get_taxi_by_id)
            .put((0, validationMiddleware_1.validateObjectId)("taxi_id"), updateMany_taxi)
            .patch((0, validationMiddleware_1.validateObjectId)("taxi_id"), updateOne_taxi)
            .delete((0, validationMiddleware_1.validateObjectId)("taxi_id"), remove_taxi);
    }
}
const taxiRouter = new TaxiRouter().router;
exports.default = taxiRouter;
