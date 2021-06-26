import { EntityRepository, FindManyOptions, LessThan, Repository } from 'typeorm';
import { UserRatings } from '../../db/schemas/typeormSchemas/UserRatingsTypeOrmSchema';

@EntityRepository(UserRatings)
export class UserRatingsTypeOrmRepository extends Repository<UserRatings> {
  async rate(ratingData: any) {
    const users = await this.find({ username: ratingData.username });

    const index = users.findIndex((user) => user.productId === +ratingData.productId);
    const data = {
      username: ratingData.username,
      productId: +ratingData.productId,
      rating: +ratingData.rating,
      comment: ratingData.comment,
    };

    if (index === -1) {
      const newRating = await this.createQueryBuilder('user_ratings')
        .insert()
        .into(UserRatings)
        .values(data)
        .returning('id')
        .execute();

      const ratingToRes = await this.findOne({ id: newRating.raw[0].id });
      const allRatingsById = await this.find({ productId: ratingData.productId });

      return {
        ratingToRes,
        allRatingsById,
      };
    }

    data.rating = ratingData.rating || +users[index].rating;
    data.comment = ratingData.comment || users[index].comment;
    const updatedRating = await this.createQueryBuilder('user_ratings')
      .update()
      .set(data)
      .where({ username: data.username, productId: data.productId })
      .returning('id')
      .execute();

    const ratingToRes = await this.findOne({ id: updatedRating.raw[0].id });
    const allRatingsById = await this.find({ productId: ratingData.productId });

    return {
      ratingToRes,
      allRatingsById,
    };
  }

  async get10LastRatings() {
    const conditions: FindManyOptions<UserRatings> = {
      order: { created_at: 'DESC' },
      take: 10,
    };
    return this.find(conditions);
  }

  async deleteRatings(date: string) {
    return this.createQueryBuilder('user_ratings')
      .delete()
      .from(UserRatings)
      .where({ created_at: LessThan(date) })
      .execute();
  }
}
