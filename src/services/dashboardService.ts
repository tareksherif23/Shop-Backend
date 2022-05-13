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
}
