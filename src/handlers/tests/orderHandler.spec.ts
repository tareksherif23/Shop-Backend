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
			.post('/api/v1/users/signup')
			.send(user)
			.then((res) => {
				expect(res.status).toBe(200);
				token = res.body.token;
				console.log(token);
				done();
			});
	});

	it('should require authentication on get all orders', (done) => {
		request.get('/api/v1/orders/').then((res) => {
			expect(res.status).toBe(401);
			done();
		});
	});

	it('should get all orders after token verification', (done) => {
		request
			.get('/api/v1/orders')
			.set('Authorization', `Bearer ${token}`)
			.then((res) => {
				expect(res.status).toBe(200);
				done();
			});
	});

	it('should require authentication on GET /orders/:id', (done) => {
		request.get('/api/v1/orders/1').then((res) => {
			expect(res.status).toBe(401);
			done();
		});
	});

	it('should require authentication on POST /orders', (done) => {
		request.post('/api/v1/orders').then((res) => {
			expect(res.status).toBe(401);
			done();
		});
	});

	it('should require authentication on DELETE /orders/:id', (done) => {
		request.delete('/api/v1/orders/1').then((res) => {
			expect(res.status).toBe(401);
			done();
		});
	});
});
