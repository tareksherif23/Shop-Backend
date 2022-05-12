import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
	username: string;
}

export const verifyAuthToken = function (req: Request, res: Response, next: NextFunction) {
	try {
		const authorizationHeader = req.headers.authorization as string;
		const token = authorizationHeader.split(' ')[1]; // Bearer <TOKEN>
		const { username } = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
		// add userId to res.locals
		res.locals.username = username;
		console.log('username: ', res.locals.username);
	} catch (err) {
		return res.status(401).json('Access denied, invalid token');
	}
	next();
};
