import { ProductRepository  } from '../repositories/productRepository';

export const getAllProducts = async () => {
    try {
        const repository = new ProductRepository().create();
        const data = await repository.getAll();
        return data;
    } catch (error) {
        console.log(error)
    }
};