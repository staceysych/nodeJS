import { User } from '../../db/schemas/typegooseSchemas/UserTypegooseSchema';

import { hashPassword } from '../../utils/passwordHelpers';

export class UserTypegooseRepository {
  public dataModel;

  constructor() {
    this.dataModel = User;
  }

  async getOne(username: string) {
    return this.dataModel.findOne({ username });
  }

  async getAll() {
    return this.dataModel.find({});
  }

  async createUser(username: string, password: string, role: string, firstName?: string, lastName?: string) {
    const data = {
      username,
      password: await hashPassword(password),
      firstName: firstName || '',
      lastName: lastName || '',
      role: role || 'buyer',
    };
    return new User(data).save();
  }

  async update(username: string, payload: any) {
    return this.dataModel.findOneAndUpdate({ username }, payload);
  }

  async updatePassword(username: string, newPassword: string) {
    return this.dataModel.findOneAndUpdate({ username }, { password: await hashPassword(newPassword) });
  }
}
