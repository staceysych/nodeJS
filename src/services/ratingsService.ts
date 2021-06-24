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

export const getLastRatings = async () => {
  try {
    const repository = new RatingsRepository().create();
    return repository.get10LastRatings();
  } catch (error) {
    console.log(error);
  }
};
