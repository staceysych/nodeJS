import { countTotalRating } from '../../src/utils/countTotalRating';

describe('countTotalRating()', () => {
  const mockedRatingsArray = [
    {
      username: 'paulTrof',
      productId: '1',
      rating: 5,
    },
    {
      username: 'denSych',
      productId: '1',
      rating: 7,
    },
  ];

  it('should calculate total rating', () => {
    expect(countTotalRating(mockedRatingsArray)).toEqual('6.0');
  });
});
