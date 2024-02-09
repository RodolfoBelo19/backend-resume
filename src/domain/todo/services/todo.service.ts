import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../repositories/todo.repository';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async create(createAboutDto: CreateTodoDto) {
    return this.todoRepository.create(createAboutDto);
  }

  async findAll() {
    return this.todoRepository.findAll();
  }

  async findOne(id: string) {
    return this.todoRepository.findById(id);
  }

  async update(id: string, updateAboutDto: UpdateTodoDto) {
    return this.todoRepository.update(id, updateAboutDto);
  }

  async remove(id: string) {
    return this.todoRepository.delete(id);
  }

  async reorder(ids: string[], orders: number[]): Promise<void> {
    await this.todoRepository.updateOrder(ids, orders);
  }
}
