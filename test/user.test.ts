import app from '../app';
import { describe, it, afterAll } from '@jest/globals';
import mongoose from 'mongoose';
import UserModel from '../src/users/user.schema';
import * as request from 'supertest';

describe('/users endpoint', () => {
    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('Deve inserir um usuário no banco de dados', async () => {
        const userMock = {
            username: 'usuario_teste',
            password: 'senha123',
            email: 'usuario@teste.com'
        };

        const response = await request.default(app).post('/users').send(userMock);
        const foundUser = await UserModel.findById(response.body._id);

        expect(response.status).toEqual(201);
        expect(response.body._id).toBeDefined();
        expect(userMock.username).toBe(foundUser?.username);
        expect(userMock.password).toBe(foundUser?.password);
        expect(userMock.email).toBe(foundUser?.email);
    });

    it('Deve buscar todos os usuários no banco de dados', async () => {
        const response = await request.default(app).get('/users');
        const totalUsersOnDatabase = await UserModel.countDocuments();

        expect(response.body.length).toEqual(totalUsersOnDatabase);
    });
});
