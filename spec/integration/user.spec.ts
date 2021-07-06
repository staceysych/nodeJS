import { dbConnect, dbDisconnect } from '../dbHandler';

import { AdminService } from '../../src/services';

const supertest = require('supertest');
const app = require('../../src/routes');

const auth = {
  token: '',
  refreshToken: '',
};

const mockedUserData = {
  username: 'harryPotter',
  password: '123Love!',
  role: 'buyer',
  firstName: 'Harry',
  lastName: '',
};

const mockedUserDataAdmin = {
  username: 'hermioneGranger',
  password: '123Love!',
  role: 'admin',
  firstName: 'Hermione',
  lastName: 'Granger',
};

const mockedCategory = {
  displayName: 'strategy',
};

beforeAll(async () => {
  await dbConnect();
  await AdminService.addCategory(mockedCategory);
});

afterAll(async () => dbDisconnect());

describe('User routes tests', () => {
  it('POST users/register - should register a user', async () => {
    await supertest(app).post('/users/register').send(mockedUserData).expect(200);
    await supertest(app).post('/users/register').send(mockedUserDataAdmin).expect(200);
  });

  it('GET /users should return an array of users', async () => {
    const { body } = await supertest(app).get(`/users`);
    expect(body).toEqual(expect.any(Array));
    expect(body[0].username).toEqual('harryPotter');
  });

  it('POST /users/authenticate - should log in user', async () => {
    const { body } = await supertest(app).post(`/users/authenticate`).send({
      username: 'harryPotter',
      password: '123Love!',
    });
    auth.token = body.token;
    auth.refreshToken = body.refreshToken;
    expect(200);
    expect(body.status).toEqual('Logged in');
  });

  it('POST /users/token - should return a new token', async () => {
    const { body } = await supertest(app).post(`/users/token`).send({
      refreshToken: auth.refreshToken,
    });
    expect(200);
    expect(auth.token).not.toEqual(body.accessToken);
    auth.token = body.accessToken;
  });

  it('PUT /users/profile - should update user data', async () => {
    const { body } = await supertest(app).put(`/users/profile`).auth(auth.token, { type: 'bearer' }).send({
      username: 'harryPotter',
      lastName: 'Potter',
    });
    expect(200);
    expect(body.lastName).toEqual('Potter');
  });

  it('POST /users/profile/password - should update password', async () => {
    await supertest(app).post(`/users/profile/password`).auth(auth.token, { type: 'bearer' }).send({
      username: 'harryPotter',
      password: '123Love!',
      newPassword: 'Harry123!',
    });
    expect(200);
    const { res } = await supertest(app).post(`/users/authenticate`).send({
      username: 'harryPotter',
      password: '123Love!',
    });
    expect(res.text).toEqual('{"error":{"status":401,"message":"Incorrect username or password"}}');
  });

  it('GET /users/admin/products/{id} - should get a product by id', async () => {
    const { body } = await supertest(app).post(`/users/authenticate`).send({
      username: 'hermioneGranger',
      password: '123Love!',
    });
    auth.token = body.token;
    auth.refreshToken = body.refreshToken;

    const allUsers = await supertest(app).get(`/users`);
    if (allUsers.body[1].username === 'hermioneGranger' && allUsers.body[1].role === 'admin') {
      await supertest(app)
        .post(`/users/admin/products`)
        .auth(auth.token, { type: 'bearer' })
        .send({
          displayName: "Harry Potter and the Sorcerer's Stone",
          categoryIds: ['strategy'],
          price: 120,
        });

      expect(200);
    }
  });
});
