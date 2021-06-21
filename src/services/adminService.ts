import { ApiError } from '../utils';
import { ProductRepository } from '../repositories/productRepository';
import { CategoryRepository } from '../repositories/categoryRepository';

const productRepository = new ProductRepository().create();
const categoryRepository = new CategoryRepository().create();

export const getProductById = async (id: any) => {
  try {
    const data = await productRepository.getById(id);
    return data;
  } catch (error) {
    ApiError.badRequest(error);
  }
};

export const addProduct = async (productData: any) => {
  try {
    return await productRepository.createProduct(productData);
  } catch (error) {
    ApiError.badRequest(error);
  }
};

export const updateProduct = async (id: any, payload: any) => {
  try {
    return productRepository.update(id, payload);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductById = async (id: any) => {
  try {
    return productRepository.delete(id);
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryById = async (id: any) => {
  try {
    const data = await categoryRepository.getById(id);
    return data;
  } catch (error) {
    ApiError.badRequest(error);
  }
};

export const addCategory = async (payload: any) => {
  try {
    return categoryRepository.createCategory(payload);
  } catch (error) {
    ApiError.badRequest(error);
  }
};

export const updateCategory = async (id: any, payload: any) => {
  try {
    return categoryRepository.update(id, payload);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategoryById = async (id: any) => {
  try {
    return categoryRepository.delete(id);
  } catch (error) {
    console.log(error);
  }
};
