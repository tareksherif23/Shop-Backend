import client from '../database';

export type Product = {
	id?: string;
	name: string;
	price: number;
};

export class ProductStore {
	async index(): Promise<Product[]> {
		try {
			const conn = await client.connect();
			const sql = 'SELECT * FROM products';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Cannot get rows: ${err}`);
		}
	}

	async show(name: string): Promise<Product[]> {
		try {
			const conn = await client.connect();
			const sql = 'SELECT * FROM products WHERE name LIKE ($1)';
			const result = await conn.query(sql, [`%${name}%`]);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Cannot get rows: ${err}`);
		}
	}

	async create(p: Product): Promise<Product> {
		try {
			const conn = await client.connect();
			const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
			const result = await conn.query(sql, [p.name, p.price]);
			const product = result.rows[0];
			conn.release();
			return product;
		} catch (err) {
			throw new Error(`Cannot add row: ${err}`);
		}
	}

	async delete(id: string): Promise<Product> {
		try {
			const conn = await client.connect();
			const sql = 'DELETE FROM products WHERE id=($1)';
			const result = await conn.query(sql, [id]);
			const product = result.rows[0];
			conn.release();
			return product;
		} catch (err) {
			throw new Error(`Cannot delete rows: ${err}`);
		}
	}
}
