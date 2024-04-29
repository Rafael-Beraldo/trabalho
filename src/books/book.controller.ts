import { Request, Response } from 'express';
import bookService from './book.service';
import userService from '../users/user.service';

class BookController {

    async create(req: Request, res: Response) {
        try {
            const { userId } = req.body; 
            const user = await userService.findById(userId); 
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            const book = await bookService.create(req.body); 
            res.status(201).json(book);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findById(req: Request, res: Response) {
        const book = await bookService.findById(req.params.id)
        return res.json(book)
    }

    async find(req: Request, res: Response) {
        const books = await bookService.findAll()
        return res.json(books)
    }

    async update(req: Request, res: Response) {
        const updatedBook = await bookService.update(req.params.id, req.body)
        return res.json(updatedBook)
    }

    async delete(req: Request, res: Response) {
        const deleteReturn = await bookService.delete(req.params.id)
        return res.json(deleteReturn)
    }

}

export default new BookController()