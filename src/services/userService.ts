import { ApiError } from '../utils';
import { UserRepository } from '../repositories/userRepository';

const repository = new UserRepository().create();

export const getOneUser = async (username: string) => {
  try {
    return repository.getOne(username);
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
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
    return repository.createUser(username, password, role, firstName, lastName);
  } catch (error) {
    ApiError.conflict(error);
  }
};

export const updateProfile = async (username: string, userData: any) => {
  try {
    return repository.update(username, userData);
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (username: string, newPassword: string) => {
  try {
    return repository.updatePassword(username, newPassword);
  } catch (error) {
    console.log(error);
  }
};
