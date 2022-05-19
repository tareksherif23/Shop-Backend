import { User, UserStore } from '../models/userModel';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const store = new UserStore();

export const getAllUsers = async (_req: Request, res: Response) => {
	try {
		const users = await store.index();
		res.status(200).json({ result: 'success', data: users });
	} catch (err) {
		res.status(500).send(err);
	}
};

export const getUser = async (req: Request, res: Response) => {
	try {
		const id = req.params.userID;
		const user = await store.show(id);
		if (!user) {
			return res.status(404).send(`couldn't find a user with id: ${id}`);
		}
		res.json({ result: 'success', data: user });
	} catch (err) {
		res.status(500).send(err);
	}
};

export const signUp = async (req: Request, res: Response) => {
	const user: User = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	};
	try {
		const newUser = await store.create(user);
		var token = jwt.sign(
			{ username: newUser.username, password: newUser.password },
			process.env.JWT_SECRET as string,
			{
				expiresIn: '6h'
			}
		);
		res.json({ token: token });
	} catch (err) {
		console.log('errooorr:: ', err);
		res.status(400).json(`an error occured: ${err}`);
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const id = req.params.userID;
		const deleted_user = await store.delete(id);
		res.status(200).json({ result: 'success', data: deleted_user });
	} catch (err) {
		res.status(500).send(err);
	}
};

export const login = async (req: Request, res: Response) => {
	const username = req.body.username as string;
	const password = req.body.password as string;
	try {
		const u = await store.authenticate(username, password);
		if (u) {
			var token = jwt.sign({ username: username, password: password }, process.env.JWT_SECRET as string, {
				expiresIn: '6h'
			});
			res.json({ token: token });
		} else throw new Error('username or password is incorrect');
	} catch (err) {
		res.status(400).json(`an error occured: ${err}`);
	}
};
