import { Product } from '../db/schemas/ProductTypegooseSchema';

export class ProductTypegooseRepository {
  public dataModel;

  constructor() {
    this.dataModel = Product;
  }

  async getAll() {
    return await this.dataModel.find({});
    }

  async getByName(displayName: string) {
    return await this.dataModel.find({ displayName: new RegExp(displayName, "i") });
    }

  async getByMinRating(minRating: string) {
    return await this.dataModel.find({ totalRating: { $gte: minRating } });
    }

    async getByMinMaxPrice(priceParam: string) {
      const priceRange = priceParam.split(':');
      const maxPrice = priceRange[1];
      const minPrice = priceRange[0];

      if(!maxPrice) {
        return await this.dataModel.find({ price: { $gte: minPrice } });
      } else {
        return await this.dataModel.find({ price: { $gte: minPrice || 0, $lte: maxPrice } });
      }
    }
}