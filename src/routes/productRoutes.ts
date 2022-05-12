import express from 'express';
import { verifyAuthToken } from '../middleware/authentication';
import { getAllProducts, searchProducts, createProduct, deleteProduct } from '../handlers/productHandler';

export const productRouter = express.Router();

productRouter.get('/', getAllProducts);
productRouter.get('/:productName', searchProducts);
productRouter.post('/', verifyAuthToken, createProduct);
productRouter.delete('/:productID', verifyAuthToken, deleteProduct);
