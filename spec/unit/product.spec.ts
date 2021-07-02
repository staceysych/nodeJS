import { dbConnect, dbDisconnect } from '../dbHandler';
import { AdminService } from '../../src/services';

const supertest = require('supertest');
const app = require('../../src/routes');

beforeAll(async () => dbConnect());

afterAll(async () => dbDisconnect());

describe('Product routes tests ', () => {
  const mockedCategory = {
    displayName: 'Sports',
  };

  const mockedProduct = {
    displayName: 'FIFA',
    price: 79,
    categoryIds: ['Sports'],
    totalRating: 4.3,
  };

  it('GET /products', async () => {
    await AdminService.addCategory(mockedCategory);
    await AdminService.addProduct(mockedProduct);
    const { body } = await supertest(app).get(`/products`);
    expect(body.length).toEqual(1);
  });

  /*   it('GET /products/getByDisplayName', async () => {
    await supertest(app)
      .get(`/products/getByDisplayName`)
      .query({ displayName: mockedProduct.displayName })
      .expect(200)
      .then((response) => {
        expect(response.body.price).toBe(mockedProduct.price);
        expect(response.body.totalRating).toBe(mockedProduct.totalRating);
      });
  }); */
});
