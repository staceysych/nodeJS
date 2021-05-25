import { EntityRepository, Repository } from "typeorm";
import { Category } from "../db/schemas/CategoryTypeOrmSchema";

@EntityRepository(Category)
export class CategoryTypeOrmRepository extends Repository<Category> {

    async getAll() {
        return await this.find({});
    }
}