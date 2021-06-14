import { getCustomRepository } from "typeorm";

import { CategoryTypegooseRepository } from './typegooseRepositories/ICategoryTypegooseRepository';
import { CategoryTypeOrmRepository } from './typeormRepositories/ICategoryTypeOrmRepository';

export class CategoryRepository {
    create() {
        if (process.env.DB === 'mongo') {
            return new CategoryTypegooseRepository();
        } else {
           return getCustomRepository(CategoryTypeOrmRepository);
        }
      }
}