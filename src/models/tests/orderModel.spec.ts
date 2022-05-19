import { Order, OrderStore } from '../../models/orderModel';
import { User } from '../../models/userModel';
import { Product, ProductStore } from '../../models/productModel';

const store = new OrderStore();
const productStore = new ProductStore();

let order_id: string, user_id: string, product_id: string;

describe('Order Model', () => {
	beforeAll(async () => {
		const user: User = {
			first_name: 'Tarek2',
			last_name: 'Sherif2',
			username: 'tshermor81',
			email: 'tsher81@gmail.com',
			password: '3veRyStrongPswd'
		};

		user_id = user.id as string;

		// Create product
		const product: Product = await productStore.create({
			name: 'Test Product',
			price: 100
		});

		product_id = product.id as string;

		// Create order
		const order: Order = await store.create({
			user_id,
			status: 'ACTIVE'
		});

		order_id = order.id as string;

		// Add product to order
		await store.addProduct(order_id, product_id, 1);
	});

	it('should have an index method', () => {
		expect(store.index).toBeDefined();
	});
	it('should have a show method', () => {
		expect(store.show).toBeDefined();
	});
	it('should have a create method', () => {
		expect(store.create).toBeDefined();
	});
	it('should have a delete method', () => {
		expect(store.delete).toBeDefined();
	});

	it('should have and addProduct method', () => {
		expect(store.addProduct).toBeDefined();
	});
	it('create method should add a order', async () => {
		const result = await store.create({
			user_id,
			status: 'ACTIVE'
		});
		expect(result).not.toBeNull();
		expect(result.status).toBe('ACTIVE');
	});

	it('index method should return a list of orders', async () => {
		const result = await store.index();
		expect(result.length).toBeGreaterThan(0);
	});

	it('delete method should delete the order', async () => {
		const result = await store.delete(order_id);
		expect(result).not.toBeNull();
		expect(result.id).toBe(order_id);
	});
});
