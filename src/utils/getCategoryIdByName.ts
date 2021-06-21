import { CategoryService } from '../services';
import { POSTGRES_DB } from './constants';

export const getCategoryIdByName = async (arrayOfNames: string[]) => {
  const newArray = await Promise.all(
    arrayOfNames.map(async (name) => {
      const category = await CategoryService.getCategoryByName(name);
      return process.env.DB === POSTGRES_DB ? category[0].id : category._id;
    })
  );

  return newArray;
};
