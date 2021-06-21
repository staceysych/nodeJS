import { CategoryRepository } from '../repositories/categoryRepository';

const repository = new CategoryRepository().create();

export const getAllCategories = async () => {
  try {
    const data = await repository.getAll();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryById = async (id: any) => {
  try {
    const data = await repository.getById(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryByName = async (displayName: string) => {
  try {
    const data = await repository.getByName(displayName);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryByIdWithProducts = async (id: any, includeProducts: boolean, includeTop3Products: boolean) => {
  try {
    const data = await repository.getByIdWithProducts(id, includeProducts, includeTop3Products);
    return data;
  } catch (error) {
    console.log(error);
  }
};
