import { Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboardService';

const dashboard = new DashboardQueries();

export const productsInOrders = async (_req: Request, res: Response) => {
	try {
		const products = await dashboard.productsInOrders();
		res.status(200).json({ result: 'success', data: products });
	} catch (err) {}
};

export const usersWithOrders = async (_req: Request, res: Response) => {
	try {
		const users = await dashboard.usersWithOrders();
		res.status(200).json({ result: 'success', data: users });
	} catch (err) {}
};

export const fiveMostExpensive = async (_req: Request, res: Response) => {
	try {
		const products = await dashboard.fiveMostExpensive();
		res.status(200).json({ result: 'success', data: products });
	} catch (err) {}
};
