import { Product } from '../db/schemas';

export const getAll = async () => {
  return (await Product.find({}));
};