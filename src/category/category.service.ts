import CategoryModel from './category.schema';

class CategoryService {
    async create(categoryData: any) {
        const category = new CategoryModel(categoryData);
        await category.save();
        return category;
    }

    async findById(id: string) {
        return CategoryModel.findById(id);
    }

    async findAll() {
        return CategoryModel.find();
    }

    async update(id: string, categoryData: any) {
        return CategoryModel.findByIdAndUpdate(id, categoryData, { new: true });
    }

    async delete(id: string) {
        await CategoryModel.findByIdAndDelete(id);
        return 'Categoria Removida com Sucesso';
    }
}

export default new CategoryService();
