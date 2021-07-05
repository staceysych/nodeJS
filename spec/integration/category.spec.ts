import { dbConnect, dbDisconnect } from '../dbHandler';
import { AdminService } from '../../src/services';

const supertest = require('supertest');
const app = require('../../src/routes');

const mockedCategory1 = {
  displayName: 'sport',
};

const mockedCategory2 = {
  displayName: 'strategy',
};

const mockedProduct1 = {
  displayName: 'FIFA',
  price: 79,
  categoryIds: ['sport'],
};

beforeAll(async () => {
  await dbConnect();
  await AdminService.addCategory(mockedCategory1);
  await AdminService.addCategory(mockedCategory2);
  await AdminService.addProduct(mockedProduct1);
});

afterAll(async () => dbDisconnect());

describe('Category routes tests ', () => {
  it('GET /categories', async () => {
    const { body } = await supertest(app).get(`/categories`);
    expect(body.length).toEqual(2);
  });

  it('GET /categories/{id}', async () => {
    const { body } = await supertest(app).get(`/categories`);
    const category = await supertest(app).get(`/categories/${body[0]._id}`);
    expect(category.body[0].displayName).toEqual('sport');
  });

  it('GET /categories/{id}?includeProducts', async () => {
    const { body } = await supertest(app).get(`/categories`);
    const category = await supertest(app).get(`/categories/${body[0]._id}`).query({
      includeProducts: true,
    });
    expect(category.body[0].products.length).toEqual(1);
    expect(category.body[0].products[0].displayName).toEqual('FIFA');
  });
});
