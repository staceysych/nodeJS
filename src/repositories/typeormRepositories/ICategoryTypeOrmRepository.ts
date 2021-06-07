import { EntityRepository, Repository } from "typeorm";
import { Category } from "../../db/schemas/typeormSchemas/CategoryTypeOrmSchema";

@EntityRepository(Category)
export class CategoryTypeOrmRepository extends Repository<Category> {

    async getAll() {
        return this.find({});
    }

    async getById(id: any) {
        return this.find({"id": id})
        }

    async getByIdWithProducts(id: any, includeProducts: boolean, includeTop3Products: boolean) {
            if  (includeProducts || includeTop3Products) {
                const data = await this.createQueryBuilder("category")
                .where("category.id = :id", { id: id })
                .addSelect("category.products")
                .getOne()

                
                if  (data && includeTop3Products) {
                    data.products  = data?.products.sort((a, b) => b.total_rating - a.total_rating).slice(0, 3);
                }
                
                return data;
            }
        }
}