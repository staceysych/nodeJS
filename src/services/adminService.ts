import { ApiError } from '../utils';
import { ProductRepository } from '../repositories/productRepository';
import { CategoryRepository } from '../repositories/categoryRepository';

export const getProductById = async (id: any) => {
  try {
    const repository = new ProductRepository().create();
    const data = await repository.getById(id);
    return data;
  } catch (error) {
    ApiError.badRequest(error);
  }
};

export const addProduct = async (productData: any) => {
  try {
    const repository = new ProductRepository().create();
    return repository.createProduct(productData);
  } catch (error) {
    ApiError.badRequest(error);
  }
};

export const updateProduct = async (id: any, payload: any) => {
  try {
    const repository = new ProductRepository().create();
    return repository.update(id, payload);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductById = async (id: any) => {
  try {
    const repository = new ProductRepository().create();
    return repository.delete(id);
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryById = async (id: any) => {
  try {
    const repository = new CategoryRepository().create();
    const data = await repository.getById(id);
    return data;
  } catch (error) {
    ApiError.badRequest(error);
  }
};

export const addCategory = async (payload: any) => {
  try {
    const repository = new CategoryRepository().create();
    return await repository.createCategory(payload);
  } catch (error) {
    ApiError.badRequest(error);
  }
};

export const updateCategory = async (id: any, payload: any) => {
  try {
    const repository = new CategoryRepository().create();
    return repository.update(id, payload);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategoryById = async (id: any) => {
  try {
    const repository = new CategoryRepository().create();
    return repository.delete(id);
  } catch (error) {
    console.log(error);
  }
};
