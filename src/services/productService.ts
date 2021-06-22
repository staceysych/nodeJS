import { ApiError } from '../utils';
import { ProductRepository } from '../repositories/productRepository';
import { IRating } from '../interfaces';

export const getAllProducts = async (limit = 0, skip = 0) => {
  try {
    const repository = new ProductRepository().create();
    const data = await repository.getAll(limit, skip);
    return data;
  } catch (error) {
    ApiError.badRequest(error);
  }
};

export const getProductById = async (id: any) => {
  try {
    const repository = await new ProductRepository().create();
    const data = await repository.getById(id);
    return data;
  } catch (error) {
    ApiError.badRequest(error);
  }
};

export const getByDisplayName = async (displayName: string) => {
  try {
    const repository = new ProductRepository().create();
    const data = await repository.getByName(displayName);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getByRating = async (minRating: number, field?: string, direction?: number) => {
  try {
    const repository = new ProductRepository().create();
    const data = await repository.getByMinRating(minRating, field, direction);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getByPrice = async (priceRange: string, field?: string, direction?: number) => {
  try {
    const repository = new ProductRepository().create();
    const data = await repository.getByMinMaxPrice(priceRange, field, direction);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const rateProduct = async (ratingData: IRating) => {
  try {
    const repository = await new ProductRepository().create();
    const data = await repository.rateProduct(ratingData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const get10LastRatings = async () => {
  try {
    const repository = await new ProductRepository().create();
    const data = await repository.get10LastRatings();
    return data;
  } catch (error) {
    console.log(error);
  }
};
