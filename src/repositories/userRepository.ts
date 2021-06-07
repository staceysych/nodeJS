import { UserTypegooseRepository } from './typegooseRepositories/IUserTypegooseRepository';

export class UserRepository {
    init() {
        if(process.env.DB === 'mongo') {
            return new UserTypegooseRepository();
        } else {
            return new UserTypegooseRepository();
        }
      }
}