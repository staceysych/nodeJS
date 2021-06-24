import { getCustomRepository } from 'typeorm';

import { UserRatingsTypegooseRepository } from './typegooseRepositories/IUserRatingsTypegooseRepository';
import { UserRatingsTypeOrmRepository } from './typeormRepositories/IUserRatingsTypeOrmRepository';

export class RatingsRepository {
  create() {
    if (process.env.DB === 'mongo') {
      return new UserRatingsTypegooseRepository();
    }
    return getCustomRepository(UserRatingsTypeOrmRepository);
  }
}
