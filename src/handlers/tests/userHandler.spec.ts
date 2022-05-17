import supertest from 'supertest';
import app from '../../server';
import jwt, { Secret } from 'jsonwebtoken';
import { User } from '../../models/userModel';

describe('User handler', () => {
	let request: supertest.SuperTest<supertest.Test> = supertest(app);
	let secret: Secret = process.env.TOKEN_SECRET as Secret;
	let token: string;
	let user_id: number;

	it('should require authorization on GET /users', (done) => {
		request.get('/users').then((res) => {
			expect(res.status).toBe(404);
			done();
		});
	});

	it('should require authorization on GET /user/${id}', (done) => {
		request.get('/users/1').then((res) => {
			expect(res.status).toBe(404);
			done();
		});
	});

	it('should require authorization on DELETE /user/${id}', (done) => {
		request.delete('/users/1').then((res) => {
			expect(res.status).toBe(404);
			done();
		});
	});

	it('should create a user on /users', (done) => {
		const user: User = {
			first_name: 'Tarek',
			last_name: 'Sherif',
			username: 'tshermor',
			email: 'tsher@gmail.com',
			password: 'veRyStrongPswd'
		};

		request
			.post('/users')
			.send(user)
			.then((res) => {
				expect(res.status).toBe(200);
				expect(res.body.success).toBe(true);
				token = res.body.token;
				// @ts-ignore
				const { user } = jwt.verify(token, secret);
				user_id = user.id;
				done();
			});
	});
});
