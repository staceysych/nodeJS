import { CategoryRepository  } from '../repositories/categoryRepository';

export const getAllCategories = async () => {
    try {
        const repository = new CategoryRepository().create();
        const data = await repository.getAll();
        return data;
    } catch (error) {
        console.log(error)
    }
};