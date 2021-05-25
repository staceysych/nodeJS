import { CategoryTypegooseRepository } from './ICategoryTypegooseRepository';
import { ProductTypeOrmRepository } from './IProductTypeOrmRepository';

type Class = { new(...args: any[]): any; };
export class CategoryRepository {
    create() {
        if(process.env.DB === 'mongo') {
            return new CategoryTypegooseRepository();
        } else {
           return new ProductTypeOrmRepository();
        }
      }
}