import express from 'express';
import { signUp, login, getAllUsers, getUser } from '../handlers/userHandler';
import { verifyAuthToken } from '../middleware/authentication';

export const userRouter = express.Router();

userRouter.get('/', verifyAuthToken, getAllUsers);
userRouter.get('/:userId', verifyAuthToken, getUser);

// self service for user signup and login
userRouter.post('/signup', signUp);
userRouter.post('/login', login);
