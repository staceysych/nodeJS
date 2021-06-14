import { getCustomRepository } from 'typeorm';

import { CategoryTypegooseRepository as CategoryTypewroteRepository } from './typegooseRepositories/ICategoryTypegooseRepository';
import { CategoryTypeOrmRepository } from './typeormRepositories/ICategoryTypeOrmRepository';

export class CategoryRepository {
  create() {
    if (process.env.DB === 'mongo') {
      return new CategoryTypewroteRepository();
    }
    return getCustomRepository(CategoryTypeOrmRepository);
  }
}
