import { Between, EntityRepository, MoreThanOrEqual, Repository } from 'typeorm';
import { Product } from '../../db/schemas/typeormSchemas/ProductTypeOrmSchema';

import { SORT_DIRECTION } from '../../utils/constants';

import { IProduct } from '../../interfaces';
import { getCategoryIdByName } from '../../utils';

@EntityRepository(Product)
export class ProductTypeOrmRepository extends Repository<Product> {
  async getById(id: any) {
    console.log(id);
    return this.find({ id });
  }

  async getAll(limit?: number, skip?: number) {
    return this.find({ skip, take: limit });
  }

  async getByName(displayName: string) {
    return this.find({ display_name: displayName });
  }

  async getByMinRating(minRating: number, field?: string, direction = 1) {
    const defaultField = 'id';
    const stringDirection = direction === 1 ? SORT_DIRECTION[0] : SORT_DIRECTION[1];
    return this.find({
      where: { total_rating: MoreThanOrEqual(minRating) },
      order: { [field || defaultField]: stringDirection },
    });
  }

  async getByMinMaxPrice(priceParam: string, field?: string, direction = 1) {
    const [minPrice, maxPrice] = priceParam.split(':');
    const defaultField = 'id';
    const stringDirection = direction === 1 ? SORT_DIRECTION[0] : SORT_DIRECTION[1];

    return maxPrice
      ? this.find({
          where: { price: Between(minPrice || 0, maxPrice) },
          order: { [field || defaultField]: stringDirection },
        })
      : this.find({
          where: { price: MoreThanOrEqual(minPrice) },
          order: { [field || defaultField]: stringDirection },
        });
  }

  async createProduct(productData: IProduct) {
    const array = await getCategoryIdByName(productData.categoryIds as string[]);
    const data = {
      display_name: productData.displayName,
      category_ids: array,
      created_at: new Date(),
      price: +productData.price,
      total_rating: +productData.totalRating,
    };
    console.log(data);
    return this.createQueryBuilder('product').insert().into(Product).values(data).execute();
  }

  async update(id: number, payload: any) {
    console.log(payload);
    // categoryIds
    return this.createQueryBuilder('product').update().set(payload).where({ id }).execute();
  }

  async delete(id: number) {
    return this.createQueryBuilder('product').delete().from(Product).where({ id }).execute();
  }
}
