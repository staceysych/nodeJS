import { Product } from '../../db/schemas/typegooseSchemas/ProductTypegooseSchema';
import { SORT_DIRECTION } from '../../utils/constants';

import { IProduct } from '../../interfaces';
import { getCategoryIdByName, convertDateToTimestamp } from '../../utils';

export class ProductTypegooseRepository {
  public dataModel;

  constructor() {
    this.dataModel = Product;
  }

  async getById(id: any) {
    return this.dataModel.find({ _id: id });
  }

  async getAll(limit = 0, skip = 0) {
    return this.dataModel.find({}).skip(skip).limit(limit);
  }

  async getByName(displayName: string) {
    return this.dataModel.find({ displayName: new RegExp(displayName, 'i') });
  }

  async getByMinRating(minRating: number, field?: string, direction?: number) {
    const sortField = field as string;
    const defaultField = 'displayName';
    const defaultDirection = 1;

    return this.dataModel
      .find({ totalRating: { $gte: minRating } })
      .sort({ [sortField || defaultField]: direction || defaultDirection });
  }

  async getByMinMaxPrice(priceParam: string, field?: string, direction?: number) {
    const sortField = field as string;
    const defaultField = 'displayName';
    const defaultDirection = 1;
    const [minPrice, maxPrice] = priceParam.split(':');

    return maxPrice
      ? this.dataModel
          .find({ price: { $gte: minPrice || 0, $lte: maxPrice } })
          .sort({ [sortField || defaultField]: direction || defaultDirection })
      : this.dataModel
          .find({ price: { $gte: minPrice } })
          .sort({ [sortField || defaultField]: direction || defaultDirection });
  }

  async sortByFieldAndDirection(data: any, field: string, direction: string) {
    const dir = direction === SORT_DIRECTION[0].toLocaleLowerCase() ? 1 : -1;
    return data.find({ $orderby: { [field]: dir } });
  }

  async createProduct(productData: IProduct) {
    const data = {
      displayName: productData.displayName,
      categoryIds: await getCategoryIdByName(productData.categoryIds as string[]),
      createdAt: convertDateToTimestamp(),
      price: productData.price,
      totalRating: productData.totalRating,
    };
    return new Product(data).save();
  }

  async update(id: any, payload: any) {
    if (payload.categoryIds && payload.categoryIds.length) {
      // eslint-disable-next-line no-param-reassign
      payload.categoryIds = await getCategoryIdByName(payload.categoryIds as string[]);
    }

    return this.dataModel.findOneAndUpdate({ _id: id }, payload);
  }

  async delete(id: any) {
    return this.dataModel.deleteOne({ _id: id });
  }
}
