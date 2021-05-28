import { Product } from '../db/schemas/ProductTypegooseSchema';

export class ProductTypegooseRepository {
  public dataModel;

  constructor() {
    this.dataModel = Product;
  }

  async getAll() {
    return await this.dataModel.find({});
    }
}