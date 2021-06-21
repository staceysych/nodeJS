import { ApiError } from '../utils';
import { UserRepository } from '../repositories/userRepository';

export const getOneUser = async (username: string) => {
  try {
    const repository = new UserRepository().create();
    return repository.getOne(username);
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const repository = new UserRepository().create();
    return repository.getAll();
  } catch (error) {
    console.log(error);
  }
};

export const register = async (
  username: string,
  password: string,
  role: string,
  firstName?: string,
  lastName?: string
) => {
  try {
    const repository = new UserRepository().create();
    return repository.createUser(username, password, role, firstName, lastName);
  } catch (error) {
    ApiError.conflict(error);
  }
};

export const updateProfile = async (username: string, userData: any) => {
  try {
    const repository = new UserRepository().create();
    return repository.update(username, userData);
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (username: string, newPassword: string) => {
  try {
    const repository = new UserRepository().create();
    return repository.updatePassword(username, newPassword);
  } catch (error) {
    console.log(error);
  }
};
