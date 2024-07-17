import { Router } from "express";
import authRouter from './auth';
import paymentRouter from './payments';
import { authenticateUser } from "../middelwares/jwt";

const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/payments',authenticateUser, paymentRouter);


export default mainRouter

