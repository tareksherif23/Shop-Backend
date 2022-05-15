import { Order, OrderStore } from '../models/orderModel';
import { Request, Response } from 'express';

const store = new OrderStore();

export const getAllOrders = async (_req: Request, res: Response) => {
	try {
		const orders = await store.index();
		res.status(200).json({ result: 'success', data: orders });
	} catch (err) {}
};

export const getOrder = async (req: Request, res: Response) => {
	try {
		const id = req.params.orderID;
		const order = await store.show(id);
		if (!order) {
			return res.status(404).send(`couldn't find an order with id: ${id}`);
		}
		res.json({ result: 'success', data: order });
	} catch (err) {}
};

export const createOrder = async (req: Request, res: Response) => {
	try {
		const newOrder: Order = {
			status: 'ACTIVE',
			user_id: res.locals.username
		};
		const order = await store.create(newOrder);
		res.status(201).json({ result: 'success', data: order });
	} catch (error) {}
};

export const deleteOrder = async (req: Request, res: Response) => {
	try {
		const id = req.params.orderId;
		const deleted_order = await store.delete(id);
		res.status(200).json({ result: 'success', data: deleted_order });
	} catch (err) {}
};
