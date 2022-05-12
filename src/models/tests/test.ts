import {Weapon, WeaponStore} from '../weaponModel'

const store = new WeaponStore()

describe("Weapon Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.index).toBeDefined();
  });

  it('create method should add a weapon', async () => {
    const result = await store.create({
      name: 'Bridge to Terabithia',
      type: 'heavy',
      weight: 45,
    });
    expect(result).toEqual({
      id: "1",
      name: 'Bridge to Terabithia',
      type: 'heavy',
      weight: 45
    });
  });

  it('index method should return a list of weapons', async () => {
    const result = await store.index();
    expect(result).toEqual([{
      id: "1",
      name: 'Bridge to Terabithia',
      type: 'heavy',
      weight: 45,
    }]);
  });

  it('show method should return the correct weapon', async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      id: "1",
      name: 'Bridge to Terabithia',
      type: 'heavy',
      weight: 45,
    });
  });

  it('delete method should remove the weapon', async () => {
    store.delete("1");
    const result = await store.index()
    expect(result).toEqual([]);
  });
});