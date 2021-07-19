import { getCustomRepository } from 'typeorm';

import { CategoryTypegooseRepository as CategoryTypewroteRepository } from './typegooseRepositories/ICategoryTypegooseRepository';
import { CategoryTypeOrmRepository } from './typeormRepositories/ICategoryTypeOrmRepository';

import { POSTGRES_DB } from '../utils/constants';

export class CategoryRepository {
  create() {
    if (process.env.DB === POSTGRES_DB) {
      return getCustomRepository(CategoryTypeOrmRepository);
    }
    return new CategoryTypewroteRepository();
  }
}
