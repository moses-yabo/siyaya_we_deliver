import mongoose from "mongoose";
import { logger } from "../utils/logger";
export default async ()=>{
    const Db_URL = process.env?.DB_URL as string;
    const DB_PASSWORD = process.env?.DB_PASSWORD as string;
try {

  mongoose.set('strictQuery', false);
  await mongoose.connect(Db_URL.replace("<password>",DB_PASSWORD));
  logger.info("DB Connected");
  mongoose.connection.on("error",(error:Error)=>{
  logger.error(`${error.message}`);
  });
  mongoose.connection.on("disconnect",()=>{
    logger.info("DB is disconnected ");
  });

} catch (error:any) {
  logger.error(` {
    message:${error?.message},
    name: ${error?.name}
    }`);
}

}