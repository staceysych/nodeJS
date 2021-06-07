import { prop, getModelForClass } from '@typegoose/typegoose';

class UserClass {
  @prop({ required: true, unique: true})
    public username!: string;

    @prop({ required: true })
    public password!: string;
}

const User = getModelForClass(UserClass, { schemaOptions: { collection: "users" }});

export { User };