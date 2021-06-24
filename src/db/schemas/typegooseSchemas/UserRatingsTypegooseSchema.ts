import { prop, getModelForClass } from '@typegoose/typegoose';

class UserRatingsClass {
  @prop({ required: true })
  public username!: string;

  @prop({ required: true, type: () => String })
  public createdAt!: Date;

  @prop({ required: true, type: () => String })
  public productId!: string;

  @prop({ required: true, default: 0 })
  public rating?: number;

  @prop({ default: '' })
  public comment?: string;
}

const UserRatings = getModelForClass(UserRatingsClass, { schemaOptions: { collection: 'lastRatings' } });

export { UserRatings };
