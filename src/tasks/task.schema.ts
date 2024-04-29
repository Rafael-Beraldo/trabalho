import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
    title: String,
    description: String,
    creationDate: Date,
    completionDate: Date,
    category: { type: Schema.Types.ObjectId, ref: 'Category' }, 
    status: { type: String, enum: ['pendente', 'em andamento', 'concluída'] },
    user: { type: Schema.Types.ObjectId, ref: 'User' } 
}, {
    timestamps: true
});

export default model('Task', taskSchema);
