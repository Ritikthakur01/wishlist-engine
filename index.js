import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from "dotenv";
import routes from './routes'
import connectDb from './config/mongoose';

dotenv.config();

const app = express();

app.use(cors());         
app.use(morgan('dev'));  
app.use(express.json()); 
app.use(routes)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
