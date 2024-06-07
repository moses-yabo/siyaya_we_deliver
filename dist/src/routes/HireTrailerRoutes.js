"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trailerHiringRoutes = void 0;
const express_1 = require("express");
const HireTrailerController_1 = require("../controllers/HireTrailerController");
const trailerRouter = (0, express_1.Router)();
const trailerHiring = new HireTrailerController_1.TrailerHire();
function trailerHiringRoutes() {
    trailerRouter
        .get("/", trailerHiring.listHirings)
        .get("/:hiringId", trailerHiring.getHiringsById)
        .post("/hiring", trailerHiring.createHiring)
        .put("/:hiringId", trailerHiring.updateHiring)
        .delete("/:hiringId", trailerHiring.deleteHiring);
    return trailerRouter;
}
exports.trailerHiringRoutes = trailerHiringRoutes;
