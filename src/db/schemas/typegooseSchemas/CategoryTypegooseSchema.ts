import { prop, getModelForClass } from '@typegoose/typegoose';

class CategoryClass {
  @prop({ required: true, type: () => String })
    public displayName!: string;
}

const Category = getModelForClass(CategoryClass, { schemaOptions: { collection: "categories" }});

export {Category};