import TaskModel from './task.schema';

class TaskService {
    async create(taskData: any, userId: string) {
        const task = new TaskModel({ ...taskData, user: userId });
        await task.save();
        return task;
    }

    async findById(id: string) {
        return TaskModel.findById(id);
    }

    async findAll() {
        return TaskModel.find();
    }

    async update(id: string, taskData: any) {
        return TaskModel.findByIdAndUpdate(id, taskData, { new: true });
    }

    async delete(id: string) {
        await TaskModel.findByIdAndDelete(id);
        return 'tasks Removida com Sucesso';
    }

    async findAllByUsuario(userId: any) {

        const tasks = await TaskModel.find();

        return tasks.filter(tasks => tasks.user?.toString() === userId);
    }

    async findAllByCategory(Category: any) {

        const tasks = await TaskModel.find();

        return tasks.filter(tasks => tasks.Category?.toString() === Category);

    }

    async findAllByStatus(status: string) {

        const tasks = await TaskModel.find();

        return tasks.filter(tasks => tasks.status === status);
    }

    async countByUser(userId: any) {

        const tasks = await TaskModel.find();
        return tasks.filter(tasks => tasks.user?.toString() === userId).length;
    }

    async recentTask(userId: any) {

        const tasks = await TaskModel.find();

        tasks.filter(tasks => tasks.user === userId)
            .sort((a, b) => new Date(b.creationDate!).getTime() - new Date(a.creationDate!).getTime());

        const taskRecent = tasks[0];
        return taskRecent;
    }

    async media() {

        const tasks = await TaskModel.find();
        const totaltasks = tasks.length;
        const tasksConcluidas = tasks.filter(tasks => tasks.status === 'concluída').length;

        return (tasksConcluidas / totaltasks) * 100;
    }

    async maiorDesc() {

        const tasks = await TaskModel.find();
        return tasks.map(tasks => tasks.description).sort((a, b) => b!.length - a!.length);
    }

    async latesttasks(userId: any) {

        const tasks = await TaskModel.find();

        return tasks.filter(tasks => tasks.user?.toString() === userId)
            .sort((a, b) => new Date(a.creationDate!).getTime() - new Date(b.creationDate!).getTime());

    }
}

export default new TaskService();
