import { Between, EntityRepository, LessThan, MoreThan, MoreThanOrEqual, Repository } from "typeorm";
import { Product } from "../db/schemas/ProductTypeOrmSchema";

@EntityRepository(Product)
export class ProductTypeOrmRepository extends Repository<Product> {

    async getAll() {
        return await this.find({});
    }

    async getByName(displayName: string) {
        return await this.find({ display_name: displayName });
    }

    async getByMinRating(minRating: string) {
        return await this.find({ where: {total_rating: MoreThanOrEqual(minRating)}});
    }

    async getByMinMaxPrice(priceParam: string) {
        const priceRange = priceParam.split(':');
        const maxPrice = priceRange[1];
      const minPrice = priceRange[0];

      if(!maxPrice) {
        return await this.find({ where: {price: MoreThanOrEqual(minPrice)}});
      } else {
        return await this.find({ where: {price: Between(minPrice || 0, maxPrice)}});
      }
    }
}