import { CategoryRepository } from '../repositories/categoryRepository';

export const getAllCategories = async () => {
  try {
    const repository = new CategoryRepository().create();
    const data = await repository.getAll();
    return data;
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
    console.log(error);
  }
};

export const getCategoryByIdWithProducts = async (id: any, includeProducts: boolean, includeTop3Products: boolean) => {
  try {
    const repository = new CategoryRepository().create();
    const data = await repository.getByIdWithProducts(id, includeProducts, includeTop3Products);
    return data;
  } catch (error) {
    console.log(error);
  }
};
