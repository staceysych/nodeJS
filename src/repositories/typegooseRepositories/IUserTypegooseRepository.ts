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

  async create(username: string, password: string) {
    const data = { username, password: await bcrypt.hash(password, 12),
    };
    return new User(data).save();
  };
}