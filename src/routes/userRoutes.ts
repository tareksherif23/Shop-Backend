import express from 'express';
import { signUp, login } from '../handlers/userHandler';

export const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/login', login);
