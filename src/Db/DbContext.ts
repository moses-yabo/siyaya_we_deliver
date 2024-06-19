import mongoose from "mongoose";

export default async ()=>{
    const Db_URL = process.env?.DB_URL as string;
    const DB_PASSWORD = process.env?.DB_PASSWORD as string;

    mongoose.set('strictQuery', false);
    await mongoose.connect(Db_URL.replace("<password>",DB_PASSWORD))
    .then(()=>{
          console.log("DB Connected");
        })
    .catch((err:Error)=>{
              console.log(err.message);
        });
}