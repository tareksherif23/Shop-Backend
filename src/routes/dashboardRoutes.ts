import express from 'express';
import { verifyAuthToken } from '../middleware/authentication';
import { productsInOrders, usersWithOrders, fiveMostExpensive } from '../handlers/dashboardHandler';

export const dashboardRouter = express.Router();

dashboardRouter.use(verifyAuthToken);

dashboardRouter.get('/products_in_orders', productsInOrders);
dashboardRouter.get('/users-with-orders', usersWithOrders);
dashboardRouter.get('/five-most-expensive', fiveMostExpensive);
