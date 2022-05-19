import supertest from 'supertest';
import app from '../../server';
import { Product } from '../../models/productModel';
import { User } from '../../models/userModel';

describe('Product handler', () => {
	let request: supertest.SuperTest<supertest.Test> = supertest(app);
	let token: string;
	let productCreated: Product;

	beforeAll((done) => {
		const user: User = {
			first_name: 'Tarek',
			last_name: 'Sherif',
			username: 'tshermor',
			email: 'tsher@gmail.com',
			password: 'veRy%Strong%Pswd'
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

	it('should require authorization on create product', (done) => {
		request.post('/api/v1/products').then((res) => {
			expect(res.status).toBe(401);
			done();
		});
	});

	it('should create a product on /products POST', (done) => {
		const product: Product = {
			name: 'Macbook pro M1',
			price: 1500
		};

		request
			.post('/api/v1/products')
			.set('Authorization', `Bearer ${token}`)
			.send(product)
			.then((res) => {
				expect(res.status).toBe(201);
				productCreated = res.body.data;
				expect(productCreated.name).toEqual(product.name);
				done();
			});
	});

	it('should get the list of products on /products', (done) => {
		request
			.get('/api/v1/products')
			.set('Authorization', `Bearer ${token}`)
			.then((res) => {
				expect(res.status).toBe(200);
				expect(res.body.data.length).toBeGreaterThan(0);
				done();
			});
	});

	it('should get a single product on /products/:productName', (done) => {
		request
			.get(`/api/v1/products/book`)
			.set('Authorization', `Bearer ${token}`)
			.then((res) => {
				expect(res.status).toBe(200);
				console.log(res.body.data);
				expect(res.body.data[0].name).toEqual('Macbook pro M1');
				done();
			});
	});
});
