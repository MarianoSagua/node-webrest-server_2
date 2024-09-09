import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoDataSource {
  abstract create(createTodoDTO: CreateTodoDto): Promise<TodoEntity>;
  abstract getAll(): Promise<TodoEntity[]>;
  abstract findByID(id: number): Promise<TodoEntity>;
  abstract updateByID(updateTodoDTO: UpdateTodoDto): Promise<TodoEntity>;
  abstract deleteByID(id: number): Promise<TodoEntity>;
}
