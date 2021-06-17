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

export const addProduct = async (productData: any) => {
  try {
    const repository = await new ProductRepository().create();
    return await repository.createProduct(productData);
  } catch (error) {
    ApiError.badRequest(error);
  }
};

export const updateProduct = async (id: any, payload: any) => {
  try {
    const repository = await new ProductRepository().create();
    return repository.update(id, payload);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductById = async (id: any) => {
  try {
    const repository = await new ProductRepository().create();
    return repository.delete(id);
  } catch (error) {
    console.log(error);
  }
};
