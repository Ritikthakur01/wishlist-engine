import dotenv from "dotenv";
dotenv.config();

export const config = {
  mongodburl: process.env.MONGO_URL,
  port:process.env.PORT,
  secret: process.env.SECRET,
};