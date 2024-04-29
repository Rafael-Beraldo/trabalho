import { Request, Response } from 'express';
import categoryService from './category.service';

class CategoryController {
    async create(req: Request, res: Response) {
        try {
            const category = await categoryService.create(req.body);
            res.status(201).json(category);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const category = await categoryService.findById(req.params.id);
            if (!category) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }
            res.json(category);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async find(req: Request, res: Response) {
        try {
            const categories = await categoryService.findAll();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const updatedCategory = await categoryService.update(req.params.id, req.body);
            res.json(updatedCategory);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await categoryService.delete(req.params.id);
            res.json({ message: 'Categoria removida com sucesso' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new CategoryController();
