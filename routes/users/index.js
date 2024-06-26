import express from 'express';
import { registerUser, loginUser } from './controller';

const router = express.Router();

router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

export default router;