import UserModel from './user.schema';

class UserService {
    async create(user: any) {
        const createdUser = await UserModel.create(user);
        return createdUser;
    }

    async findById(id: string) {
        const foundUser = await UserModel.findById(id);
        return foundUser;
    }

    // Adicione outros métodos conforme necessário...
}

export default new UserService();
