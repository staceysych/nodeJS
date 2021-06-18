import { Between, EntityRepository, MoreThanOrEqual, Repository } from 'typeorm';
import { Product } from '../../db/schemas/typeormSchemas/ProductTypeOrmSchema';

import { SORT_DIRECTION } from '../../utils/constants';

import { IProductTypeorm } from '../../interfaces';
import { getCategoryIdByName } from '../../utils';

@EntityRepository(Product)
export class ProductTypeOrmRepository extends Repository<Product> {
  async getById(id: any) {
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

  async createProduct(productData: IProductTypeorm) {
    const data = {
      display_name: productData.display_name,
      category_ids: await getCategoryIdByName(productData.category_ids as string[]),
      total_rating: +productData.total_rating,
      price: +productData.price,
    };

    const createdProduct = await this.createQueryBuilder('product')
      .insert()
      .into(Product)
      .values(data)
      .returning('id')
      .execute();
    return this.findOne({ id: createdProduct.raw[0].id });
  }

  async update(id: number, payload: any) {
    if (payload.category_ids && payload.category_ids.length) {
      // eslint-disable-next-line no-param-reassign
      payload.category_ids = await getCategoryIdByName(payload.category_ids as string[]);
    }

    return this.createQueryBuilder('product').update().set(payload).where({ id }).execute();
  }

  async delete(id: number) {
    return this.createQueryBuilder('product').delete().from(Product).where({ id }).execute();
  }

  async rateProduct(ratingData: any) {
    return this.createQueryBuilder('product').insert().into(Product).values(ratingData).execute();
  }
}
