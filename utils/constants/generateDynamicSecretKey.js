import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();

export const generateDynamicSecretKey = () => {
    return process.env.JWT_SECRET || uuidv4();
};