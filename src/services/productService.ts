import { ProductRepository  } from '../repositories/productRepository';


export const getAllProducts = async (limit = 0, skip = 0) => {
    try {
        const repository = await new ProductRepository().create();
        const data = await repository.getAll(limit, skip);
        return data;
    } catch (error) {
        console.log(error)
    }
};

export const getByDisplayName = async (displayName: string) => {
    try {
        const repository = await new ProductRepository().create();
        const data = await repository.getByName(displayName);
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const getByRating = async (minRating: string, field?: string, direction?: number) => {
    try {
        const repository = await new ProductRepository().create();
        const data = await repository.getByMinRating(minRating, field, direction);
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const getByPrice = async (priceRange: string, field?: string, direction?: number) => {
    try {
        const repository = await new ProductRepository().create();
        const data = await repository.getByMinMaxPrice(priceRange, field, direction);
        return data;
    } catch (error) {
        console.log(error)
    }
}