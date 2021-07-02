import { dbConnect, dbDisconnect } from '../dbHandler';
import { AdminService, ProductService } from '../../src/services';
import { convertDateToTimestamp } from '../../src/utils';

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

const mockedProduct2 = {
  displayName: 'GTA',
  price: 34,
  categoryIds: ['strategy'],
};

beforeAll(async () => {
  await dbConnect();
  await AdminService.addCategory(mockedCategory1);
  await AdminService.addCategory(mockedCategory2);
  await AdminService.addProduct(mockedProduct1);
  await AdminService.addProduct(mockedProduct2);
});

afterAll(async () => dbDisconnect());

describe('Product routes tests ', () => {
  it('GET /products', async () => {
    const { body } = await supertest(app).get(`/products`);
    expect(body.length).toEqual(2);
  });

  it('GET /products/getByDisplayName', async () => {
    const { body } = await supertest(app).get(`/products/getByDisplayName`).query({ displayName: 'FIFA' });
    expect(body[0].price).toBe(mockedProduct1.price);
  });

  it('GET /products/getByPrice', async () => {
    const { body } = await supertest(app).get(`/products/getByPrice`).query({ price: ':50' });
    expect(body.length).toEqual(1);
    expect(body[0].displayName).toEqual('GTA');
  });

  it('GET /products/getByMinRating', async () => {
    const allProducts = await supertest(app).get(`/products`);
    const mockedRating1 = {
      username: 'harryPotter',
      productId: allProducts.body[0]._id,
      rating: 4,
      comment: '',
      createdAt: convertDateToTimestamp(),
    };
    await ProductService.rateProduct(mockedRating1);
    const products = await supertest(app).get(`/products/getByMinRating`).query({ minRating: 3 });
    expect(products.body.length).toEqual(1);
    expect(products.body[0].totalRating).toEqual(4);
    expect(products.body[0].displayName).toEqual('FIFA');
  });
});
