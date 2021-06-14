import { getCustomRepository } from "typeorm";

import { UserTypegooseRepository } from './typegooseRepositories/IUserTypegooseRepository';
import { UserTypeOrmRepository } from './typeormRepositories/IUserTypeOrmRepository';

export class UserRepository {
    init() {
        if(process.env.DB === 'mongo') {
            return new UserTypegooseRepository();
        } else {
            return getCustomRepository(UserTypeOrmRepository);
        }
      }
}