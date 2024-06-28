"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundErrorHandler = void 0;
const logger_1 = require("../utils/logger");
const responseMiddleware_1 = require("./responseMiddleware");
const NotFoundErrorHandler = (req, res, next) => {
    const url = req.originalUrl;
    const time = new Date().toISOString();
    logger_1.logger.error(` Path ${url} at ${time} Does not exist !`);
    (0, responseMiddleware_1.sendResponse)(res, 404, `Path ${url} at ${time} Does not exist !`);
};
exports.NotFoundErrorHandler = NotFoundErrorHandler;
