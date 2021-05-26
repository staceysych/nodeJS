import { getCustomRepository } from "typeorm";

import { ProductTypeOrmRepository } from './IProductTypeOrmRepository';
import { ProductTypegooseRepository } from './IProductTypegooseRepository';

export class ProductRepository {
    async create() {
        if(process.env.DB === 'mongo') {
            return new ProductTypegooseRepository();
        } else {
            return await getCustomRepository(ProductTypeOrmRepository);
        }
      }
}