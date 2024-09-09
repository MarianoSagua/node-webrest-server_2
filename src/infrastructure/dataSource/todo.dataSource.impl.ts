import { prisma } from "../../data/postgres-data";
import {
  CreateTodoDto,
  TodoDataSource,
  TodoEntity,
  UpdateTodoDto,
} from "../../domain";

export class TodoDataSourceImpl implements TodoDataSource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({ data: createTodoDto! });
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

  async updateByID(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.findByID(updateTodoDto.id);
    const updatedTodo = await prisma.todo.update({
      where: { id: updateTodoDto.id },
      data: updateTodoDto!.values,
    });
    return TodoEntity.fromObject(updatedTodo);
  }

  async deleteByID(id: number): Promise<TodoEntity> {
    await this.findByID(id);
    const deleted = await prisma.todo.delete({ where: { id } });
    return TodoEntity.fromObject(deleted);
  }
}
