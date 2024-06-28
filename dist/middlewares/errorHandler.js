"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../utils/logger");
const responseMiddleware_1 = require("./responseMiddleware");
const errorHandler = (error, req, res, next) => {
    const { name, message, statusCode } = error;
    const status = statusCode || 500;
    const msg = message || "Internal Server Error !";
    const stack = process.env.NODE_ENV === "production" ? null : error.stack;
    logger_1.logger.info(`{
        name: ${name},
        message: ${msg},
        status: ${status},
        stack: ${stack}
        }`);
    (0, responseMiddleware_1.sendResponse)(res, status, msg, stack);
};
exports.errorHandler = errorHandler;
