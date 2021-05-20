import { getAll } from '../repositories/productRepository';

export const getAllProducts = async () => {
    try {
        const data = await getAll();
        return data;
    } catch (error) {
        console.log(error)
    }
};