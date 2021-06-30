import { SORT_DIRECTION } from './constants';

export const getSortCriteria = (req: any) => {
  const sortObj = req.query.sortBy as string;
  const sortCriteria = sortObj.split(':');
  const field = sortCriteria[0];
  const direction = sortCriteria[1] === SORT_DIRECTION[0].toLocaleLowerCase() ? 1 : -1;

  return { field, direction };
};
