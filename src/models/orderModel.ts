import client from '../database';

type OrderStatus = 'NEW' | 'PLACED' | 'PROCESSING' | 'OUT' | 'DELIVERED';

export type Order = {
	id?: string;
	status: OrderStatus;
	user_id: string;
};

export class OrderStore {
	async index(): Promise<Order[]> {
		try {
			const conn = await client.connect();
			const sql = 'SELECT * FROM orders';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Cannot get rows: ${err}`);
		}
	}

	async show(id: string): Promise<Order> {
		try {
			const conn = await client.connect();
			const sql = 'SELECT * FROM orders WHERE id=($1)';
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not find order with id: ${id}, Error: ${err}`);
		}
	}

	async create(o: Order): Promise<Order> {
		try {
			const conn = await client.connect();
			const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
			const result = await conn.query(sql, [o.status, o.user_id]);
			const order = result.rows[0];
			conn.release();
			return order;
		} catch (err) {
			throw new Error(`Could not add your order: ${o.id}. Error: ${err}`);
		}
	}

	async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
		try {
			const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
			const conn = await client.connect();
			const result = await conn.query(sql, [quantity, orderId, productId]);
			const order = result.rows[0];
			conn.release();
			return order;
		} catch (err) {
			throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`);
		}
	}

	async delete(id: string): Promise<Order> {
		try {
			const conn = await client.connect();
			const sql = 'DELETE FROM orders WHERE id=($1)';
			const result = await conn.query(sql, [id]);
			const order = result.rows[0];
			conn.release();
			return order;
		} catch (err) {
			throw new Error(`Could not delete order with id: ${id}. Error: ${err}`);
		}
	}
}
