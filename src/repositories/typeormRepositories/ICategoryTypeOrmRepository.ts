import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../../db/schemas/typeormSchemas/CategoryTypeOrmSchema';
import { ProductService } from '../../services';

@EntityRepository(Category)
export class CategoryTypeOrmRepository extends Repository<Category> {
  async getAll() {
    return this.find({});
  }

  async getById(id: any) {
    return this.find({ id });
  }

  async getByName(displayName: string) {
    return this.find({ display_name: displayName });
  }

  async getByIdWithProducts(id: any, includeProducts: boolean, includeTop3Products: boolean) {
    if (includeProducts || includeTop3Products) {
      const category = await this.findOne({ id });
      if (category) {
        const products = await ProductService.getAllProducts();
        const ProductWithGivenCategory = products.filter((product) => product.category_ids.includes(+id));

        const categoryWithProducts = {
          id: category.id,
          display_name: category.display_name,
          products: ProductWithGivenCategory || [],
        };

        if (includeTop3Products) {
          categoryWithProducts.products = categoryWithProducts.products
            .sort((a, b) => b.total_rating - a.total_rating)
            .slice(0, 3);
        }

        return categoryWithProducts;
      }
    }
  }

  async createCategory(payload: any) {
    const createdCategory = await this.createQueryBuilder('category').insert().into(Category).values(payload).execute();

    return this.findOne({ id: createdCategory.raw[0].id });
  }

  async update(id: number, payload: any) {
    return this.createQueryBuilder('category').update().set(payload).where({ id }).execute();
  }

  async delete(id: number) {
    return this.createQueryBuilder('category').delete().from(Category).where({ id }).execute();
  }
}
