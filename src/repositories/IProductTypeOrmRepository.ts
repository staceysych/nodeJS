import { EntityRepository, Repository } from "typeorm";
import { Product } from "../db/schemas/ProductTypeOrmSchema";

@EntityRepository(Product)
export class ProductTypeOrmRepository extends Repository<Product> {

    async getAll() {
        return await this.find({});
    }
}