"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomErrorHandling_1 = require("./CustomErrorHandling");
const error = new Error("something went wrong");
// console.log("error stack",error.stack);
// console.log("message",error.message);
// console.log("Name",error.name);
function dosum() {
    console.log("I am from the do function");
}
try {
    dosum();
}
catch (error) {
    throw new CustomErrorHandling_1.CustomError(error.message);
}
