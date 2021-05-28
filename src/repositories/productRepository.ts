import { getCustomRepository } from "typeorm";

import { ProductTypeOrmRepository } from './IProductTypeOrmRepository';
import { ProductTypegooseRepository } from './IProductTypegooseRepository';

type Class = { new(...args: any[]): any; };
export class ProductRepository {
    create() {
        if(process.env.DB === 'mongo') {
            return new ProductTypegooseRepository();
        } else {
            return getCustomRepository(ProductTypeOrmRepository);
        }
      }
}