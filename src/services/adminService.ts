import { ApiError } from '../utils/ApiError';
import { ProductRepository } from '../repositories/productRepository';

export const getProductById = async (id: any) => {
  try {
    const repository = await new ProductRepository().create();
    const data = await repository.getById(id);
    return data;
  } catch (error) {
    ApiError.badRequest(error);
  }
};
