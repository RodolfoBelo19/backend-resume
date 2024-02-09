import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Todo } from '../entities/todo.entity';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Injectable()
export class TodoRepository {
  constructor(@InjectModel('Todo') private todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = await new this.todoModel(createTodoDto).save();
    return createdTodo;
  }

  async findAll(): Promise<Todo[]> {
    const documents = await this.todoModel.find().exec();
    return documents.map((doc) => doc.toObject());
  }

  async findById(id: string): Promise<Todo> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('Invalid ID');
    }

    const todo = await this.todoModel.findById(id).exec();
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo.toObject();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('Invalid ID');
    }

    const todo = await this.todoModel
      .findByIdAndUpdate(id, updateTodoDto, { new: true })
      .exec();

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo.toObject();
  }

  async delete(id: string): Promise<Todo> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('Invalid ID');
    }

    const todo = await this.todoModel.findByIdAndRemove(id).exec();
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo.toObject();
  }

  async updateOrder(ids: string[], orders: number[]): Promise<void> {
    const bulkOps = ids.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order: orders[index] } },
      },
    }));

    await this.todoModel.bulkWrite(bulkOps);
  }
}
