import { Product } from '../db/schemas/ProductTypegooseSchema';

export class ProductTypegooseRepository {
  public dataModel;

  constructor() {
    this.dataModel = Product;
  }

  async getAll(limit = 0, skip = 0) {
    return await this.dataModel.find({}).skip(skip).limit(limit);
    }

  async getByName(displayName: string) {
    return await this.dataModel.find({ displayName: new RegExp(displayName, "i") });
    }

  async getByMinRating(minRating: string, field?: string, direction?: number) {
    const sortField = field as string;
    if(field && direction) {
      return await this.dataModel.find({ totalRating: { $gte: minRating } }).sort({[sortField]: direction});
    } else {
      return await this.dataModel.find({ totalRating: { $gte: minRating } });
    }
    
    }

  async getByMinMaxPrice(priceParam: string, field?: string, direction?: number) {
    const sortField = field as string;
    const priceRange = priceParam.split(':');
    const maxPrice = priceRange[1];
    const minPrice = priceRange[0];

    if(!maxPrice) {
      return field && direction 
        ? await this.dataModel.find({ price: { $gte: minPrice } }).sort({[sortField]: direction}) 
        : await this.dataModel.find({ price: { $gte: minPrice } });
    } else {
      return field && direction 
        ? await this.dataModel.find({ price: { $gte: minPrice || 0, $lte: maxPrice } }).sort({[sortField]: direction}) 
        : await this.dataModel.find({ price: { $gte: minPrice || 0, $lte: maxPrice } });
    }
  }

  async sortByFieldAndDirection(data: any, field: string, direction: string) {
    const dir = direction === 'asc' ? 1 : -1;
    return await data.find({ $orderby: { [field] : dir }});
  }
}