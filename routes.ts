import { Router } from 'express';
import bookController from './src/books/book.controller';
import userController from './src/users/user.controller'; 

const routes = Router();

routes.get('/health-check', (req, res) => {
  res.send('Health check OK');
});

routes.post('/books', bookController.create);
routes.get('/books/:id', bookController.findById);
routes.get('/books/', bookController.find);
routes.put('/books/:id', bookController.update);
routes.delete('/books/:id', bookController.delete);

routes.post('/users', userController.create);
routes.get('/users/:id', userController.findById);
routes.get('/users/', userController.find);
routes.put('/users/:id', userController.update);
routes.delete('/users/:id', userController.delete);

export { routes };