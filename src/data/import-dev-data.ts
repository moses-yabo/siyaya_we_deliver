import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import bookModel from "../models/BookingSchema";

// Read Json File
// const books = JSON.parse(fs.readFileSync(`${__dirname}/book_taxi_page.json`,"utf-8"));

console.log("op",__dirname);


// Import Data Into DB
const importData = async ()=>{
    try {
        await bookModel.create();
        console.log("data succesfully loaded");
        
    } catch (error) {
        console.error(error);
        
    }
}

// DELETE ALL DATA FROM DB

const deleteData = async ()=>{
    try {
        await bookModel.deleteMany();
        console.log("data succesfully deleted");
        
    } catch (error) {
        console.error(error);
        
    }
}
console.log("Proccess argV",process.argv)