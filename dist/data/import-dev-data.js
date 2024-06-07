"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BookingSchema_1 = __importDefault(require("../models/BookingSchema"));
// Read Json File
// const books = JSON.parse(fs.readFileSync(`${__dirname}/book_taxi_page.json`,"utf-8"));
console.log("op", __dirname);
// Import Data Into DB
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield BookingSchema_1.default.create();
        console.log("data succesfully loaded");
    }
    catch (error) {
        console.error(error);
    }
});
// DELETE ALL DATA FROM DB
const deleteData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield BookingSchema_1.default.deleteMany();
        console.log("data succesfully deleted");
    }
    catch (error) {
        console.error(error);
    }
});
console.log("Proccess argV", process.argv);
