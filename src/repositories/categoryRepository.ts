import { getCustomRepository } from "typeorm";

import { CategoryTypegooseRepository } from './ICategoryTypegooseRepository';
import { CategoryTypeOrmRepository } from './ICategoryTypeOrmRepository';

export class CategoryRepository {
    create() {
        if(process.env.DB === 'mongo') {
            return new CategoryTypegooseRepository();
        } else {
           return getCustomRepository(CategoryTypeOrmRepository);
        }
      }
}