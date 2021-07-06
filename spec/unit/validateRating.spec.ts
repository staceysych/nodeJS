import { validateRating } from '../../src/utils/validateRating';

describe('validateRating()', () => {
  it('should return true if valid', () => {
    const mockedRating = 4.6;

    expect(validateRating(mockedRating)).toBeTruthy();
  });
});
