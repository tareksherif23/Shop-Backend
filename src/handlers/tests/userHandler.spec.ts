import supertest from 'supertest';
import app from '../../server';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { User } from '../../models/userModel';

describe('User handler', () => {
	let request: supertest.SuperTest<supertest.Test> = supertest(app);
	let secret: Secret = process.env.JWT_SECRET as Secret;
	let token: string;

	it('should require authorization on GET /users', (done) => {
		request.get('/api/v1/users').then((res) => {
			expect(res.status).toBe(401);
			done();
		});
	});

	it('should require authorization on GET /user/${id}', (done) => {
		request.get('/api/v1/users/1').then((res) => {
			expect(res.status).toBe(401);
			done();
		});
	});

	it('should require authorization on DELETE /user/${id}', (done) => {
		request.delete('/api/v1/users/1').then((res) => {
			expect(res.status).toBe(404);
			done();
		});
	});

	it('a user should be able to signup on /users/signup', (done) => {
		const user: User = {
			first_name: 'Tarek2',
			last_name: 'Sherif2',
			username: 'tshermor81',
			email: 'tsher81@gmail.com',
			password: '3veRyStrongPswd'
		};

		request
			.post('/api/v1/users/signup')
			.send(user)
			.then((res) => {
				expect(res.status).toBe(200);
				token = res.body.token;
				const payload = jwt.verify(token, secret) as JwtPayload;
				const username = payload.username;
				expect(username).toBeDefined();
				done();
			});
	});
});
