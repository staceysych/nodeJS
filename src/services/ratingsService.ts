import { RatingsRepository } from '../repositories/ratingsRepository';
import { IRating } from '../interfaces';

export const addRating = async (ratingData: IRating) => {
  try {
    const repository = new RatingsRepository().create();
    return repository.rate(ratingData);
  } catch (error) {
    console.log(error);
  }
};
