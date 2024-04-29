import { Request, Response } from 'express';
import userService from './user.service';

class UserController {
  async create(req: Request, res: Response) {
    try {
      const user = await userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const user = await userService.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async find(req: Request, res: Response) {
    try {
      const users = await userService.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updatedUser = await userService.update(req.params.id, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await userService.delete(req.params.id);
      res.json({ message: 'Usuário removido com sucesso' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new UserController();
