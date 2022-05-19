import { User, UserStore } from '../../models/userModel';

const store = new UserStore();

describe('User model', () => {
	const user: User = {
		first_name: 'Tarek2',
		last_name: 'Sherif2',
		username: 'tshermor81',
		email: 'tsher81@gmail.com',
		password: '3veRyStrongPswd'
	};

	async function createUser(user: User): Promise<User> {
		return store.create(user);
	}

	async function deleteUser(id: string): Promise<User> {
		return store.delete(id);
	}

	it('should have an index method', () => {
		expect(store.index).toBeDefined();
	});
	it('should have a show method', () => {
		expect(store.show).toBeDefined();
	});
	it('should have a create method', () => {
		expect(store.create).toBeDefined();
	});
	it('should have a delete method', () => {
		expect(store.delete).toBeDefined();
	});
	it('should have an authenticate method', () => {
		expect(store.authenticate).toBeDefined();
	});
	it('create method should add a user', async () => {
		const userCreated: User = await createUser(user);
		expect(userCreated.first_name).toEqual(user.first_name);
		expect(userCreated.last_name).toEqual(user.last_name);
		expect(userCreated.username).toEqual(user.username);

		await deleteUser(userCreated.id as string);
	});
	it('index method should return users list', async () => {
		const userCreated: User = await createUser(user);

		const result = await store.index();
		expect(result.length).toBeGreaterThan(0);

		await deleteUser(userCreated.id as string);
	});
	it('show method should return a user', async () => {
		const userCreated: User = await createUser(user);
		const result = await store.show(userCreated.id as unknown as string);
		expect(result).toEqual(userCreated);

		await deleteUser(userCreated.id as string);
	});
	it('delete method should delete a user', async () => {
		const userCreated: User = await createUser(user);
		const result = await store.delete(userCreated.id as string);
		expect(result).toBeDefined();
	});
	it('authenticate method should return a user', async () => {
		const userCreated: User = await createUser(user);
		const result = await store.authenticate(userCreated.first_name, userCreated.password);
		if (result) {
			expect(result.username).toEqual(userCreated.username);
		}

		await deleteUser(userCreated.id as string);
	});
});
