import { getCustomRepository } from 'typeorm';

import { UserTypegooseRepository } from './typegooseRepositories/IUserTypegooseRepository';
import { UserTypeOrmRepository } from './typeormRepositories/IUserTypeOrmRepository';

import { POSTGRES_DB } from '../utils/constants';

export class UserRepository {
  create() {
    if (process.env.DB === POSTGRES_DB) {
      return getCustomRepository(UserTypeOrmRepository);
    }
    return new UserTypegooseRepository();
  }
}
