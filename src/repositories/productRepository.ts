import { getCustomRepository } from 'typeorm';

import { ProductTypeOrmRepository } from './typeormRepositories/IProductTypeOrmRepository';
import { ProductTypegooseRepository } from './typegooseRepositories/IProductTypegooseRepository';

export class ProductRepository {
  async create() {
    if (process.env.DB === 'mongo') {
      return new ProductTypegooseRepository();
    }
    return getCustomRepository(ProductTypeOrmRepository);
  }
}
