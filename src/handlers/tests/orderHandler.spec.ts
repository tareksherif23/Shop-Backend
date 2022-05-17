import supertest from 'supertest';
import app from '../../server';
import { User } from '../../models/userModel';

describe('orderHandler', () => {
	let request: supertest.SuperTest<supertest.Test> = supertest(app);
	let token: string;
	let orderId: number;

	beforeAll((done) => {
		const user: User = {
			first_name: 'Tarek',
			last_name: 'Sherif',
			username: 'tshermor',
			email: 'tsher@gmail.com',
			password: 'veRyStrongPswd'
		};
		// first register a user
		request
			.post('/users/signup')
			.send(user)
			.then((res) => {
				expect(res.status).toBe(200);
				expect(res.body.result).toBe('success');
				token = res.body.token;
				done();
			});
	});

	afterAll(async () => {
		await request.delete(`/orders/${orderId}`).set('Authorization', `Bearer ${token}`);
	});

	it('should require authentication on get all orders', (done) => {
		request.get('/orders').then((res) => {
			expect(res.status).toBe(404);
			done();
		});
	});

	it('should get all orders after token verification', (done) => {
		request
			.get('/orders')
			.set('Authorization', `Bearer ${token}`)
			.then((res) => {
				expect(res.status).toBe(404);
				done();
			});
	});

	it('should require authentication on GET /orders/:id', (done) => {
		request.get('/orders/1').then((res) => {
			expect(res.status).toBe(404);
			done();
		});
	});

	it('should require authentication on POST //orders', (done) => {
		request.post('/orders').then((res) => {
			expect(res.status).toBe(404);
			done();
		});
	});

	it('should require authentication on DELETE /orders/:id', (done) => {
		request.delete('/orders/1').then((res) => {
			expect(res.status).toBe(404);
			expect(res.body.success).toBeFalse();
			done();
		});
	});
});
