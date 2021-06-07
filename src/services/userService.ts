import { ApiError } from '../utils/ApiError';
import { UserRepository  } from '../repositories/userRepository';
import { IUser } from '../interfaces';


export const register = async (user: IUser) => {
    try {
        const repository = await new UserRepository().init();
        const data = await repository?.create(user);
        return data;
    } catch (error) {
        ApiError.conflict(error);
    }
};