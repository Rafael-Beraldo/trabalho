import app from '../app';
import mongoose from 'mongoose';
import request from 'supertest';

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('Testes das rotas de tasks', () => {
    it('Deve criar uma nova tarefa', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({
                title: 'Nova Tarefa',
                description: 'Descrição da nova tarefa',
                user: 'user_id',
                category: 'category_id',
                status: 'pendente',
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.title).toBe('Nova Tarefa');
    });

    it('Deve obter detalhes de uma tarefa específica', async () => {
        const createResponse = await request(app)
            .post('/tasks')
            .send({
                title: 'Tarefa para teste',
                description: 'Descrição da tarefa para teste',
                user: 'user_id',
                category: 'category_id',
                status: 'pendente',
            });

        const taskId = createResponse.body._id;

        const response = await request(app).get(`/tasks/${taskId}`);

        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Tarefa para teste');
    });
});

