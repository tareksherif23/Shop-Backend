import { Product, ProductStore } from '../models/productModel';
import { Request, Response } from 'express';

const store = new ProductStore();

export const getAllProducts = async (_req: Request, res: Response) => {
	const products = await store.index();
	res.status(200).json({ result: 'success', data: products });
};

export const searchProducts = async (req: Request, res: Response) => {
	const name = req.params.productName;
	const products = await store.show(name);
	if (!products) {
		return res.status(404).send(`couldn't find a match for ${name}`);
	}
	res.json({ result: 'success', data: products });
};

export const createProduct = async (req: Request, res: Response) => {
	const newProduct: Product = {
		name: req.body.productName,
		price: req.body.productPrice
	};
	const product = await store.create(newProduct);
	res.status(201).json({ result: 'success', data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
	const id = req.params.productID;
	const deleted_product = await store.delete(id);
	res.status(200).json({ result: 'success', data: deleted_product });
};
