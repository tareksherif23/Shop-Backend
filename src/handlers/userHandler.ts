import { User, UserStore } from '../models/userModel';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const store = new UserStore();

export const signUp = async (req: Request, res: Response) => {
	const user: User = {
		first_name: req.body.first_name,
		last_name: req.body.first_name,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	};
	try {
		const newUser = await store.create(user);
		var token = jwt.sign(
			{ username: newUser.username, password: newUser.password },
			process.env.JWT_SECRET as string
		);
		res.json(token);
	} catch (err) {
		res.status(400).json(`an error occured: ${err}`);
	}
};

export const login = async (req: Request, res: Response) => {
	const username = req.body.username as string;
	const password = req.body.password as string;
	try {
		const u = await store.authenticate(username, password);
		if (u) {
			var token = jwt.sign({ username: username, password: password }, process.env.JWT_SECRET as string);
			res.json(token);
		} else throw new Error('username or password is incorrect');
	} catch (err) {
		res.status(400).json(`an error occured: ${err}`);
	}
};
