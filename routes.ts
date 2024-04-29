import { Router } from 'express';
import userController from './src/users/user.controller'; 
import categoryController from './src/category/category.controller';
import taskController from './src/tasks/task.controller';

const routes = Router();

routes.get('/health-check', (req, res) => {
  res.send('Health check OK');
});

routes.post('/users', userController.create);
routes.get('/users/:id', userController.findById);
routes.get('/users/', userController.find);
routes.put('/users/:id', userController.update);
routes.delete('/users/:id', userController.delete);

routes.post('/categories', categoryController.create);
routes.get('/categories/:id', categoryController.findById);
routes.get('/categories', categoryController.find);
routes.put('/categories/:id', categoryController.update);
routes.delete('/categories/:id', categoryController.delete);

routes.get('/tasks/user/:userId', taskController.findAllByUsuario);
routes.get('/tasks/category/:categoryId', taskController.findAllByCategoria);
routes.get('/tasks/status/:status', taskController.findAllByStatus);
routes.get('/tasks/date-range/:startDate/:endDate', taskController.findAllByDataRange);
routes.get('/tasks/count/user/:userId', taskController.countByUser);
routes.get('/tasks/recent/user/:userId', taskController.recentTask);
routes.get('/tasks/average-completion', taskController.media);
routes.get('/tasks/longest-description', taskController.maiorDesc);
routes.get('/tasks/category/:categoryId', taskController.findByCategory);

export { routes };