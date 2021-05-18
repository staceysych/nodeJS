import { model, Schema, Model, Document } from 'mongoose';

interface ICategory extends Document {
    displayName: string;
  }

const CategorySchema: Schema = new Schema(
  {
    displayName: { type: String, required: true },
  },
  { collection: 'categories' }
);

const Category: Model<ICategory> = model('Category', CategorySchema);

module.exports = Category;