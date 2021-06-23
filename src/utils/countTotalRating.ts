import { IRating } from '../interfaces';

export const countTotalRating = (ratingArray: IRating[] | any) =>
  (ratingArray.reduce((acc, cur) => acc + +cur.rating, 0) / ratingArray.length).toFixed(1);
