import { Between, EntityRepository, MoreThanOrEqual, Repository } from "typeorm";
import { Product } from "../../db/schemas/typeormSchemas/ProductTypeOrmSchema";

import { SORT_DIRECTION } from '../../utils/constants';

@EntityRepository(Product)
export class ProductTypeOrmRepository extends Repository<Product> {

    async getAll(limit?: number, skip?: number) {
        return this.find({ skip: skip, take: limit });
    }

    async getByName(displayName: string) {
        return this.find({ display_name: displayName });
    }

    async getByMinRating(minRating: number, field?: string, direction = 1) {
      const defaultField = 'id';
      const stringDirection = direction === 1 ? SORT_DIRECTION[0] : SORT_DIRECTION[1];
      return this.find({ where: {total_rating: MoreThanOrEqual(minRating)}, order: {[field || defaultField]: stringDirection}});
    }

  async getByMinMaxPrice(priceParam: string, field?: string, direction = 1) {
    const [minPrice, maxPrice] = priceParam.split(':');
    const defaultField = 'id';
    const stringDirection = direction === 1 ? SORT_DIRECTION[0] : SORT_DIRECTION[1];

    return maxPrice
      ? await this.find({ where: {price: Between(minPrice || 0, maxPrice)}, order: {[field || defaultField]: stringDirection}})
      : await this.find({ where: {price: MoreThanOrEqual(minPrice)}, order: {[field || defaultField]: stringDirection}})
  }
}