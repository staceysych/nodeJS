import { POSTGRES_DB } from '../utils/constants';

const RatingsService = require('../services/ratingsService');

export const updateRatings = async () => {
  try {
    const allRatings = await RatingsService.getLastRatings();
    const lastDate =
      process.env.DB === POSTGRES_DB
        ? allRatings[allRatings.length - 1].created_at
        : allRatings[allRatings.length - 1].createdAt;
    await RatingsService.deleteRatings(lastDate);
  } catch (e) {
    console.log(e);
  }
};
