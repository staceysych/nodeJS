import { ApiError } from '../utils/ApiError';
import { UserRepository  } from '../repositories/userRepository';
import { IUser } from '../interfaces';

export const getAllUsers = async () => {
    try {
        const repository = new UserRepository().init();
        return repository.getAll();
    } catch (error) {
        console.log(error)
    }
};


export const register = async (username: string, password: string) => {
    try {
        const repository = await new UserRepository().init();
        return repository.create(username, password);
    } catch (error) {
        ApiError.conflict(error);
    }
};