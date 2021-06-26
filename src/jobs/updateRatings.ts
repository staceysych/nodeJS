const RatingsService = require('../services/ratingsService');

export const updateRatings = async () => {
  try {
    const allRatings = await RatingsService.getLastRatings();
    const lastDate = allRatings[allRatings.length - 1].createdAt;
    console.log(lastDate);
    await RatingsService.deleteRatings(lastDate);
  } catch (e) {
    console.log(e);
  }
};
