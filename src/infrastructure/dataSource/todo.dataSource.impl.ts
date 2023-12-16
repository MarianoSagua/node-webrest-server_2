import { prisma } from "../../data/postgres-data";
import {
  CreateTodoDTO,
  TodoDataSource,
  TodoEntity,
  UpdateTodoDTO,
} from "../../domain";

export class TodoDataSourceImpl implements TodoDataSource {
  async create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
    const todo = await prisma.todo.create({ data: createTodoDTO! });

    return TodoEntity.fromObject(todo);
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map((todo) => TodoEntity.fromObject(todo));
  }

  async findByID(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) throw `Todo with ID ${id} not found!!`;
    return TodoEntity.fromObject(todo);
  }

  async updateByID(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
    await this.findByID(updateTodoDTO.id);

    const updatedTodo = await prisma.todo.update({
      where: { id: updateTodoDTO.id },
      data: updateTodoDTO!.values,
    });

    return TodoEntity.fromObject(updatedTodo);
  }

  async deleteByID(id: number): Promise<TodoEntity> {
    await this.findByID(id);

    const deleted = await prisma.todo.delete({ where: { id } });

    return TodoEntity.fromObject(deleted);
  }
}
