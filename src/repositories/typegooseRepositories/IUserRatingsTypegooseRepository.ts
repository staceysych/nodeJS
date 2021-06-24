/* eslint-disable no-param-reassign */
import { UserRatings } from '../../db/schemas/typegooseSchemas/UserRatingsTypegooseSchema';

import { IRating } from '../../interfaces';

export class UserRatingsTypegooseRepository {
  public dataModel;

  constructor() {
    this.dataModel = UserRatings;
  }

  async rate(ratingData: IRating) {
    const users = await this.dataModel.find({ username: ratingData.username });
    const index = users.findIndex((user) => user.productId === ratingData.productId);

    if (index === -1) {
      return new UserRatings(ratingData).save();
    }

    ratingData.rating = ratingData.rating || +users[index].rating;
    ratingData.comment = ratingData.comment || users[index].comment;

    return this.dataModel.findOneAndUpdate(
      { username: ratingData.username, productId: ratingData.productId },
      ratingData
    );
  }

  async get10LastRatings() {
    return this.dataModel.find({}).sort({ createdAt: -1 }).limit(10);
  }
}
