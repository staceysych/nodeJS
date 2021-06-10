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


export const register = async (username: string, password: string, firstName?: string, lastName?: string) => {
    try {
        const repository = await new UserRepository().init();
        return repository.create(username, password, firstName, lastName);
    } catch (error) {
        ApiError.conflict(error);
    }
};

export const updateUserProfile = async (username: string, userData: any) => {
    try {
    const repository = await new UserRepository().init();
    return repository.update(username, userData);
    } catch (error) {
      console.log(error)
    }
  };
