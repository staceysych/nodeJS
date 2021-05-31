import { EntityRepository, Repository } from "typeorm";
import { Category } from "../db/schemas/CategoryTypeOrmSchema";

@EntityRepository(Category)
export class CategoryTypeOrmRepository extends Repository<Category> {

    async getAll() {
        return await this.find({});
    }

    async getById(id: any) {
        return await this.find({"id": id})
        }

    async getByIdWithProducts(id: any, includeProducts = "false", includeTop3Products = "false") {
            if(includeProducts === "true" || includeTop3Products === "true") {
                const data = await this.createQueryBuilder("category")
                .where("category.id = :id", { id: id })
                .addSelect("category.products")
                .getOne()

                
                if(data && includeTop3Products === "true") {
                    data.products  = data?.products.sort((a, b) => b.total_rating - a.total_rating).slice(0, 3);
                }
                
                return data;
            }
        }
}