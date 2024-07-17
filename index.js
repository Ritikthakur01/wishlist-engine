import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from "dotenv";
import routes from './routes'
import connectDb from './config/mongoose';
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from 'swagger-jsdoc';

dotenv.config();

const app = express();
  
app.use(cors());         
app.use(morgan('dev'));  
app.use(bodyParser.json());
app.use(cookieParser());
app.use('',routes)

const swaggerOptions = {
  definition : {
    openapi : "3.0.0",
    info : {
      title : "Payment service api's",
      version : "1.0.0",
      description : "A Payment service api's have CRUD functionality."
    },
    servers : [
      {
        url : `http://localhost:9000`
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [
      {
        BearerAuth: []
      }
    ]
  },
  apis : ["./routes/auth/index.js","./routes/payments/index.js"]
}

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});