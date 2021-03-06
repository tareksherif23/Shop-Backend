import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export type User = {
	id?: string;
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	password: string;
};

export class UserStore {
	async index(): Promise<User[]> {
		try {
			const conn = await client.connect();
			const sql = 'SELECT * FROM users';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (err) {
			throw new Error(`Cannot get rows: ${err}`);
		}
	}

	async show(id: string): Promise<User> {
		try {
			const conn = await client.connect();
			const sql = 'SELECT * FROM users WHERE id=($1)';
			const result = await conn.query(sql, [id]);
			conn.release();
			return result.rows[0];
		} catch (err) {
			throw new Error(`Could not find order with id: ${id}, Error: ${err}`);
		}
	}

	async create(u: User): Promise<User> {
		try {
			const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || '10'));
			const password_digest = await bcrypt.hash(u.password + process.env.BCRYPT_PEPPER, salt);
			const conn = await client.connect();
			const sql =
				'INSERT INTO users (first_name, last_name, username, email, password_digest) VALUES($1, $2, $3, $4, $5) RETURNING *';
			const result = await conn.query(sql, [u.first_name, u.last_name, u.username, u.email, password_digest]);
			const user = result.rows[0];
			conn.release();
			return user;
		} catch (err) {
			throw new Error(`Could not create new user: ${u.username}. Error: ${err}`);
		}
	}

	async delete(id: string): Promise<User> {
		try {
			const conn = await client.connect();
			const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
			const result = await conn.query(sql, [id]);
			const product = result.rows[0];
			conn.release();
			return product;
		} catch (err) {
			throw new Error(`Cannot delete rows: ${err}`);
		}
	}

	async authenticate(username: string, password: string): Promise<User | null> {
		try {
			const conn = await client.connect();
			const sql = 'SELECT password_digest FROM users WHERE username=($1)';
			const result = await conn.query(sql, [username]);
			conn.release();
			if (result.rows.length) {
				const user = result.rows[0];
				if (bcrypt.compareSync(password + process.env.BCRYPT_PEPPER, user.password_digest)) return user;
			}
			return null;
		} catch (err) {
			throw new Error(`Could not authenticate user: ${username}. Error: ${err}`);
		}
	}
}
