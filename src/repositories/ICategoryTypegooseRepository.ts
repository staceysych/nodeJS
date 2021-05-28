import { Category } from '../db/schemas/CategoryTypegooseSchema';

export class CategoryTypegooseRepository {
  public dataModel;

  constructor() {
    this.dataModel = Category;
  }

  async getAll() {
    return await this.dataModel.find({});
    }
}