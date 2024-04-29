import { Request, Response } from 'express';
import taskService from './task.service';
import userService from '../users/user.service'; // Importe o serviço de usuário

class TaskController {
    async create(req: Request, res: Response) {
        try {
            const { userId } = req.body; // Extrai o ID do usuário dos dados da requisição
            const user = await userService.findById(userId); // Verifica se o usuário existe
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            const task = await taskService.create(req.body, userId); // Cria a tarefa associada ao usuário
            res.status(201).json(task);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const task = await taskService.findById(req.params.id);
            if (!task) {
                return res.status(404).json({ message: 'Tarefa não encontrada' });
            }
            res.json(task);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async find(req: Request, res: Response) {
        try {
            const tasks = await taskService.findAll();
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const updatedTask = await taskService.update(req.params.id, req.body);
            res.json(updatedTask);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await taskService.delete(req.params.id);
            res.json({ message: 'Tarefa removida com sucesso' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findByCategory(req: Request, res: Response) {
        try {
            const { categoryId } = req.params;
            const tasks = await TaskModel.find({ category: categoryId });
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new TaskController();
