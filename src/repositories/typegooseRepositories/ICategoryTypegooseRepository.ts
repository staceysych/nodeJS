import { Types } from 'mongoose';
import { Category } from '../../db/schemas/typegooseSchemas/CategoryTypegooseSchema';

export class CategoryTypegooseRepository {
  public dataModel;

  constructor() {
    this.dataModel = Category;
  }

  async getAll() {
    return this.dataModel.find({});
  }

  async getById(id: any) {
    return this.dataModel.find({ _id: id });
  }

  async getByName(displayName: string) {
    return this.dataModel.findOne({ displayName });
  }

  async getByIdWithProducts(id: any, includeProducts: boolean, includeTop3Products: boolean) {
    if (includeTop3Products) {
      return this.dataModel.aggregate([
        { $match: { _id: Types.ObjectId(id) } },
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: 'categoryIds',
            as: 'top3products',
          },
        },
        {
          $unwind: '$top3products',
        },
        {
          $sort: {
            'top3products.totalRating': -1,
          },
        },
        { $limit: 3 },
        {
          $group: {
            _id: '$_id',
            displayName: { $first: '$displayName' },
            top3products: {
              $push: '$top3products',
            },
          },
        },
      ]);
    }

    if (includeProducts) {
      return this.dataModel.aggregate([
        { $match: { _id: Types.ObjectId(id) } },
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: 'categoryIds',
            as: 'products',
          },
        },
      ]);
    }
  }

  async createCategory(payload: any) {
    return new Category(payload).save();
  }

  async update(id: any, payload: any) {
    return this.dataModel.findOneAndUpdate({ _id: id }, payload);
  }

  async delete(id: any) {
    return this.dataModel.deleteOne({ _id: id });
  }
}
