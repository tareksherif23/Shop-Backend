import client from '../database';

export class DashboardQueries {
	async productsInOrders(): Promise<{ name: string; price: number; order_id: string }[]> {
		try {
			const conn = await client.connect();
			const sql =
				'SELECT name, price, order_id FROM products INNER JOIN order_products ON product.id = order_products.product_id';
			const result = await conn.query(sql);
			conn.release();
			return result.rows; // returning a hybrid of two tables
		} catch (err) {
			throw new Error(`unable to get products and orders: ${err}`);
		}
	}

	async usersWithOrders(): Promise<{ firstName: string; lastName: string }[]> {
		try {
			const conn = await client.connect();
			const sql = 'SELECT first_name, last_name FROM users INNER JOIN orders ON users.id = orders.user_id';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`unable get users with orders: ${err}`);
		}
	}

	async fiveMostExpensive(): Promise<{ name: string; price: number }[]> {
		try {
			const conn = await client.connect();
			const sql = 'SELECT name, price FROM products ORDER BY price DESC LIMIT 5';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`unable get products by price: ${err}`);
		}
	}
}
