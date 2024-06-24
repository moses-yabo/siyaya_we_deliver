import  { Document} from 'mongoose';

export interface IUser extends Document{
    user_name:String,
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    role:User_roles.ADMIN | User_roles.DRIVER | User_roles.PASSENGER | User_roles.USER

}

export enum User_roles{
    ADMIN = "ADMIN",
    DRIVER = "DRIVER",
    PASSENGER ="PASSENGER",
    TAXI_OWNER = "TAXI_OWNER",
    TRAILER_RENTAL = "TRAILER_RENTAL",
    USER = "USER"
} 
export enum Business_options{
    STAFF = "STAFF_TRANSPORT",
    SCHOOL_DRIVER = "DRIVER",
    CASUAL ="CASUAL",
    TRANSPORT_GOODS = "TRANSPORT_GOODS",
    
} 

export  type users = {
    username:string,
    email:string,
    password:string
    role:User_roles.ADMIN |User_roles.DRIVER | User_roles| User_roles|User_roles.TRAILER_RENTAL ,
    time_stamp?:Date | string

}

export type Driver ={
    _id: string;
    name: string;
    licenseNumber: string;
    imgurl:string
    // Add other properties related to drivers
  }
export type Organizations = {
    _id: string;
    name: string;
    company_options: Business_options.CASUAL| Business_options.SCHOOL_DRIVER | Business_options.STAFF | Business_options.TRANSPORT_GOODS;

    // Add other properties related to drivers
  }

  