import { User } from '../../db/schemas/typegooseSchemas/UserTypegooseSchema';

import { IUser } from '../../interfaces';

export class UserTypegooseRepository {
  public dataModel;

  constructor() {
    this.dataModel = User;
  }

  async create(user: IUser) {
    const newcomer = new User(user);
    await newcomer.save();
  };
}