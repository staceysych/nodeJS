import { Types } from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';

class ProductClass {
  @prop({ required: true })
  public displayName!: string;

  @prop({ required: true })
  public categoryIds!: [Types.ObjectId];

  @prop({ required: true, type: () => String })
  public createdAt!: Date;

  @prop({ required: true })
  public totalRating!: number;

  @prop({ required: true })
  public price!: number;
}

const Product = getModelForClass(ProductClass, { schemaOptions: { collection: 'products' } });

export { Product };
