import mongoose, { Schema } from 'mongoose';
import ITask from '../interfaces/taskInterfaces';

const NoteSchema: Schema = new Schema({
    title: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    startDate: { type: Number },
    endDate: { type: Number },
    content: { type: String },
    color: { type: String },
    image: { type: String },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomLabel', default: '62ebcd03900e40a41d16f883' },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CustomLabel' }],
    rating: { type: Number },
    isLocked: { type: Boolean },
    isStarred: { type: Boolean },
    id: { type: String, unique: true }
});

export default mongoose.model<ITask>('Note', NoteSchema);
