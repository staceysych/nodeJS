import { UserRatings } from '../../db/schemas/typegooseSchemas/UserRatingsTypegooseSchema';

import { IRating } from '../../interfaces';

export class UserRatingsTypegooseRepository {
  public dataModel;

  constructor() {
    this.dataModel = UserRatings;
  }

  async rate(ratingData: IRating) {
    return new UserRatings(ratingData).save();
  }

  async get10LastRatings() {
    return this.dataModel.find({}).sort({ createdAt: -1 }).limit(10);
  }
}
