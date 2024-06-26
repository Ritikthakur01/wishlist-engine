import { Router } from "express";
import userRouter from './users'
import wishlistRoter from './wishlists'

const mainRouter = Router();

mainRouter.use('/user',userRouter);
mainRouter.use('/wishlist',wishlistRoter);


export default mainRouter

