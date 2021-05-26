import { ProductRepository  } from '../repositories/productRepository';


export const getAllProducts = async () => {
    try {
        const repository = await new ProductRepository().create();
        const data = await repository.getAll();
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

export const getByRating = async (minRating: string) => {
    try {
        const repository = await new ProductRepository().create();
        const data = await repository.getByMinRating(minRating);
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const getByPrice = async (priceRange: string) => {
    try {
        const repository = await new ProductRepository().create();
        const data = await repository.getByMinMaxPrice(priceRange);
        return data;
    } catch (error) {
        console.log(error)
    }
}