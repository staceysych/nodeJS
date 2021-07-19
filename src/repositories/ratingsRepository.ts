import { getCustomRepository } from 'typeorm';

import { UserRatingsTypegooseRepository } from './typegooseRepositories/IUserRatingsTypegooseRepository';
import { UserRatingsTypeOrmRepository } from './typeormRepositories/IUserRatingsTypeOrmRepository';

import { POSTGRES_DB } from '../utils/constants';

export class RatingsRepository {
  create() {
    if (process.env.DB === POSTGRES_DB) {
      return getCustomRepository(UserRatingsTypeOrmRepository);
    }
    return new UserRatingsTypegooseRepository();
  }
}
