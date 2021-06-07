import { Product } from '../db/schemas/ProductTypegooseSchema';
import { SORT_DIRECTION } from '../utils/constants';

export class ProductTypegooseRepository {
  public dataModel;

  constructor() {
    this.dataModel = Product;
  }

  async getAll(limit = 0, skip = 0) {
    return this.dataModel.find({}).skip(skip).limit(limit);
    }

  async getByName(displayName: string) {
    return this.dataModel.find({ displayName: new RegExp(displayName, "i") });
    }

  async getByMinRating(minRating: number, field?: string, direction?: number) {
    const sortField = field as string;
    const defaultField = 'displayName';
    const defaultDirection = 1;

    return this.dataModel.find({ totalRating: { $gte: minRating } }).sort({[sortField || defaultField]: direction || defaultDirection});
    }

  async getByMinMaxPrice(priceParam: string, field?: string, direction?: number) {
    const sortField = field as string;
    const defaultField = 'displayName';
    const defaultDirection = 1;
    const [minPrice, maxPrice] = priceParam.split(':');

    return maxPrice
      ? await this.dataModel.find({ price: { $gte: minPrice || 0, $lte: maxPrice } }).sort({[sortField || defaultField]: direction || defaultDirection})
      : await this.dataModel.find({ price: { $gte: minPrice } }).sort({[sortField || defaultField]: direction || defaultDirection});
  }

  async sortByFieldAndDirection(data: any, field: string, direction: string) {
    const dir = direction === SORT_DIRECTION[0].toLocaleLowerCase() ? 1 : -1;
    return data.find({ $orderby: { [field] : dir }});
  }
}