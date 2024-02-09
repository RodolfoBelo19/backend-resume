import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  checked: { type: Boolean, required: true },
  order: { type: Number, required: true },
});

export interface Todo extends mongoose.Document {
  id: string;
  text: string;
  checked: boolean;
  order: number;
}
