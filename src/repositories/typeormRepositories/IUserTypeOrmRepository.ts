import { v4 as uuid } from 'uuid';
import { EntityRepository, Repository } from 'typeorm';
import { hashPassword } from '../../utils/passwordHelpers';
import { User } from '../../db/schemas/typeormSchemas/UserTypeOrmSchema';

@EntityRepository(User)
export class UserTypeOrmRepository extends Repository<User> {
  async getOne(username: string) {
    return this.find({ where: { username } });
  }

  async getAll() {
    return this.find({});
  }

  async createUser(username: string, password: string, role: string, firstName?: string, lastName?: string) {
    const data = {
      id: uuid(),
      username,
      password: await hashPassword(password),
      firstName: firstName || '',
      lastName: lastName || '',
      role: role || 'buyer',
    };
    return this.createQueryBuilder('users').insert().into(User).values(data).execute();
  }

  async update(username: string, payload: any) {
    return this.createQueryBuilder('users')
      .update()
      .set({ firstName: payload.firstName, lastName: payload.lastName })
      .where({ username })
      .execute();
  }

  async updatePassword(username: string, newPassword: string) {
    return this.createQueryBuilder('users')
      .update()
      .set({ password: await hashPassword(newPassword) })
      .where({ username })
      .execute();
  }
}
