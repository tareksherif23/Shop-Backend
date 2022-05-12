import express from 'express';
import { verifyAuthToken } from '../middleware/authentication';
import { getAllOrders, getOrder, createOrder, deleteOrder } from '../handlers/orderHandler';

export const orderRouter = express.Router();

orderRouter.use(verifyAuthToken);

orderRouter.get('/', getAllOrders);
orderRouter.get('/:orderID', getOrder);
orderRouter.post('/', createOrder);
orderRouter.delete('/:orderId', deleteOrder);
