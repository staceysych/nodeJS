import { model, Schema, Model, Document, Types } from 'mongoose';

interface IProduct extends Document {
    displayName: string;
    categoryIds: [Types.ObjectId];
    createdAt: Date;
    totalRating: number;
    price: number,
  }

const ProductSchema: Schema = new Schema(
  {
    displayName: { type: String, required: true },
    categoryIds: { type: [Types.ObjectId], required: true },
    createdAt: { type: Date, required: true },
    totalRating: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { collection: 'products' }
);

const Product: Model<IProduct> = model('Product', ProductSchema);

module.exports = Product;