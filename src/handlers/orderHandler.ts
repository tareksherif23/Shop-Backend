import { Order, OrderStore } from '../models/orderModel';
import { Request, Response } from 'express';

const store = new OrderStore();

export const getAllOrders = async (_req: Request, res: Response) => {
	const username = res.locals.username;
	const orders = await store.index(username);
	res.status(200).json({ result: 'success', data: orders });
};

export const getOrder = async (req: Request, res: Response) => {
	const id = req.params.orderID;
	const order = await store.show(id);
	if (!order) {
		return res.status(404).send(`couldn't find an order with id: ${id}`);
	}
	res.json({ result: 'success', data: order });
};

export const createOrder = async (req: Request, res: Response) => {
	const newOrder: Order = {
		status: 'NEW',
		user_id: res.locals.username
	};
	const order = await store.create(newOrder);
	res.status(201).json({ result: 'success', data: order });
};

export const deleteOrder = async (req: Request, res: Response) => {
	const id = req.params.orderId;
	const deleted_order = await store.delete(id);
	res.status(200).json({ result: 'success', data: deleted_order });
};
