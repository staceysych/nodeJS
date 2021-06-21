import { ApiError } from '../utils';
import { ProductRepository } from '../repositories/productRepository';

const repository = new ProductRepository().create();

export const getAllProducts = async (limit = 0, skip = 0) => {
  try {
    const data = await repository.getAll(limit, skip);
    return data;
  } catch (error) {
    ApiError.badRequest(error);
  }
};

export const getByDisplayName = async (displayName: string) => {
  try {
    const data = await repository.getByName(displayName);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getByRating = async (minRating: number, field?: string, direction?: number) => {
  try {
    const data = await repository.getByMinRating(minRating, field, direction);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getByPrice = async (priceRange: string, field?: string, direction?: number) => {
  try {
    const data = await repository.getByMinMaxPrice(priceRange, field, direction);
    return data;
  } catch (error) {
    console.log(error);
  }
};
