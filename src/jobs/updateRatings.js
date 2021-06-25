const RatingsService = require('../services/ratingsService');

(async () => {
  try {
    const allRatings = await RatingsService.getLastRatings();
    console.log(allRatings);
  } catch (e) {
    console.log(e);
  }
})();
