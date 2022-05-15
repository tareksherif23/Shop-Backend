import express from 'express';
import { verifyAuthToken } from '../middleware/authentication';
import { getAllProducts, searchProducts, createProduct, deleteProduct } from '../handlers/productHandler';

export const productRouter = express.Router();

productRouter.get('/', getAllProducts);
productRouter.get('/:productName', searchProducts);
productRouter.post('/', verifyAuthToken, createProduct); // authentication middleware added
productRouter.delete('/:productID', verifyAuthToken, deleteProduct); // authentication middleware added
