import { dbConnect, dbDisconnect } from '../dbHandler';

const supertest = require('supertest');
const app = require('../../src/routes');

beforeAll(async () => dbConnect());

afterAll(async () => dbDisconnect());

describe('Product routes tests ', () => {
  /* const mockedProduct = {
    displayName: 'FIFA',
    price: 79,
    totalRating: 4.3,
  }; */

  it('GET /products', async () => {
    const { body } = await supertest(app).get(`/products`);
    expect(body.length).toEqual(9);
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
