import { getCustomRepository } from 'typeorm';

import { ProductTypeOrmRepository } from './typeormRepositories/IProductTypeOrmRepository';
import { ProductTypegooseRepository } from './typegooseRepositories/IProductTypegooseRepository';
import { POSTGRES_DB } from '../utils/constants';

export class ProductRepository {
  create() {
    if (process.env.DB === POSTGRES_DB) {
      return getCustomRepository(ProductTypeOrmRepository);
    }
    return new ProductTypegooseRepository();
  }
}
