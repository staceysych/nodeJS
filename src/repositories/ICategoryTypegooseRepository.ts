import { ObjectId } from 'mongoose';
import { Category } from '../db/schemas/CategoryTypegooseSchema';

export class CategoryTypegooseRepository {
  public dataModel;

  constructor() {
    this.dataModel = Category;
  }

  async getAll() {
    return await this.dataModel.find({});
    }

  async getById(id: any) {
    return await this.dataModel.find({"_id": id});
    }

  async getByIdWithProducts(id: any, includeProducts = "false", includeTop3Products = "false") {
    if(includeProducts === "true") {
      console.log(id);
      return await this.dataModel.aggregate([
        { $lookup:
          {
            from: 'products',
            localField: '_id',
            foreignField: 'categoryIds',
            as: 'products'
          }
        }
      ]);
    }
    }
}