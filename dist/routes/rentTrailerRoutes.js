"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalRouter = void 0;
const express_1 = require("express");
const rentalController_1 = require("../controllers/rentalController");
const rentalRouter = (0, express_1.Router)();
exports.rentalRouter = rentalRouter;
rentalRouter.
    get("/", rentalController_1.get_all_rentals)
    .post("/", rentalController_1.create_rental)
    .get("/:rentalId", rentalController_1.get_rentals_by_id)
    .put("/:rentalId", rentalController_1.updateMany_rentals)
    .patch("/:trentalId", rentalController_1.updateOne_rental)
    .delete("/:trentalId", rentalController_1.remove_rentals);
