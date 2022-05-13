import { Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboardService';

const dashboard = new DashboardQueries();

export const productsInOrders = async (_req: Request, res: Response) => {
	const products = await dashboard.productsInOrders();
	res.json(products);
};
