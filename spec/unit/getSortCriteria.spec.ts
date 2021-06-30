import { getSortCriteria } from '../../src/utils/getSortCriteria';

describe('getSortCriteria()', () => {
  let mockedReq;

  beforeEach(() => {
    mockedReq = {
      query: { sortBy: 'totalRating:desc' },
    };
  });

  it('should return sort field and direction', () => {
    const field = 'totalRating';
    const direction = -1;

    expect(getSortCriteria(mockedReq)).toEqual({ field, direction });
  });
});
