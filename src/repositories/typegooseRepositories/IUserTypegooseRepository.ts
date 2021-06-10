import { User } from '../../db/schemas/typegooseSchemas/UserTypegooseSchema';

const bcrypt = require('bcrypt');

export class UserTypegooseRepository {
  public dataModel;

  constructor() {
    this.dataModel = User;
  }

  async getAll() {
    return this.dataModel.find({});
  }

  async create(username: string, password: string, firstName?: string, lastName?: string) {
    const data = { username, password: await bcrypt.hash(password, 12), firstName, lastName,
    };
    return new User(data).save();
  };

  async update(username: string, payload: any) {
      return this.dataModel.findOneAndUpdate({ username }, payload);
  };
}