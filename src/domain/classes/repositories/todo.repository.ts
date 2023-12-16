import { CreateTodoDTO, UpdateTodoDTO } from "../../DTOs";
import { TodoEntity } from "../../entities/todo.entity";

export abstract class TodoRepository {
  abstract create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity>;
  abstract getAll(): Promise<TodoEntity[]>;
  abstract findByID(id: number): Promise<TodoEntity>;
  abstract updateByID(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity>;
  abstract deleteByID(id: number): Promise<TodoEntity>;
}
