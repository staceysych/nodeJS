import { ObjectId, Types } from 'mongoose';
import { Category } from '../../db/schemas/typegooseSchemas/CategoryTypegooseSchema';

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
    if(includeTop3Products === "true") {
      return await this.dataModel.aggregate([
        { $match: { _id: Types.ObjectId(id) } },
        { $lookup:
          {
            from: 'products',
            localField: '_id',
            foreignField: 'categoryIds',
            as: 'top3products'
          }
        },
        {
          $unwind: "$top3products"
        },
        {
          $sort: {
            "top3products.totalRating": -1
          }
        },
        {$limit : 3},
        {
          $group: {
            _id: "$_id",
            displayName: { "$first": "$displayName" },
            top3products: {
              $push: "$top3products"
            }
          }
        }
      ]);
    }

    if(includeProducts === "true") {
      return await this.dataModel.aggregate([
        { $match: { _id: Types.ObjectId(id) } },
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