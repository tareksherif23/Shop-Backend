import express from 'express';
import { verifyAuthToken } from '../middleware/authentication';
import { productsInOrders } from '../handlers/dashboardHandler';

export const dashboardRouter = express.Router();

dashboardRouter.use(verifyAuthToken);

dashboardRouter.get('/products_in_orders', productsInOrders);
