import { UpdateTodoDTO } from "../../DTOs";
import { TodoRepository } from "../../classes/repositories/todo.repository";
import { TodoEntity } from "../../entities/todo.entity";

export interface GetTodosUseCase {
  execute(): Promise<TodoEntity[]>;
}

export class GetTodos implements GetTodosUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(): Promise<TodoEntity[]> {
    return this.repository.getAll();
  }
}
