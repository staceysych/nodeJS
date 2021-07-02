import { dbConnect, dbDisconnect } from '../dbHandler';

import { UserService } from '../../src/services';

beforeAll(async () => dbConnect());

afterAll(async () => dbDisconnect());

describe('User ', () => {
  const mockedUserData = {
    username: 'harryPotter',
    password: '123Love!',
    role: 'buyer',
    firstName: 'Harry',
    lastName: 'Potter',
  };

  it('register a user should be successful', async () => {
    expect(async () =>
      UserService.register(
        mockedUserData.username,
        mockedUserData.password,
        mockedUserData.role,
        mockedUserData.firstName,
        mockedUserData.lastName
      )
    ).not.toThrow();
  });
});
