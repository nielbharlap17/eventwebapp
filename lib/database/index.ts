// import mongoose from 'mongoose';
// const MONGODB_URI = process.env.MONGODB_URI;
// let cached = (global as any).mongoose || {conn: null, promise: null};

// export const connectToDatabase = async () =>{
//     if(cached.conn) return cached.conn;

//     if(!MONGODB_URI) throw new Error("Please define the MONGODB_URI environment variable inside .env.local");

//     cached.promise = cached.promise || mongoose.connect(MONGODB_URI,{
//         dbName:'slot',
//         bufferCommands:false,
//     })
//     cached.conn = await cached.promise;
//     return cached.conn;
// }

import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

interface MongooseConn {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConn = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "slot",
      bufferCommands: false,
      connectTimeoutMS: 30000,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};