import { IRating } from '../interfaces';

export const countTotalRating = (ratingArray: IRating[]) =>
  (ratingArray.reduce((acc, cur) => acc + cur.rating, 0) / ratingArray.length).toFixed(1);
