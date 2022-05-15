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
			password: 'veRyStrongPswd'
		};
		// first register a user
		request
			.post('api/v1/users/signup')
			.send(user)
			.then((res) => {
				expect(res.status).toBe(200);
				expect(res.body.result).toBe('success');
				token = res.body.token;
				done();
			});
	});

	it('should require authorization on create product', (done) => {
		request.post('/products').then((res) => {
			expect(res.status).toBe(401);
			done();
		});
	});

	it('should create a product on api/v1/products POST', (done) => {
		const product: Product = {
			name: 'Macbook pro M1',
			price: 1500
		};

		request
			.post('/products')
			.set('Authorization', `Bearer ${token}`)
			.send(product)
			.then((res) => {
				expect(res.status).toBe(200);
				expect(res.body.result).toBe('success');
				productCreated = res.body.product;
				done();
			});
	});

	it('should get the list of products on api/v1/products', (done) => {
		request
			.get('/products')
			.set('Authorization', `Bearer ${token}`)
			.then((res) => {
				expect(res.status).toBe(200);
				expect(res.body.result).toBe('success');
				expect(res.body.products.length).toBeGreaterThan(0);
				done();
			});
	});

	it('should get a single product on /products/:id', (done) => {
		request
			.get(`/products/${productCreated.id}`)
			.set('Authorization', `Bearer ${token}`)
			.then((res) => {
				expect(res.status).toBe(200);
				expect(res.body.result).toBe('success');
				expect(res.body.product).toEqual(productCreated);
				done();
			});
	});
});
