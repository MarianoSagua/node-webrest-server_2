import { TodoRepository } from "../../classes/repositories/todo.repository";
import { TodoEntity } from "../../entities/todo.entity";

export interface GetTodoUseCase {
  execute(id: number): Promise<TodoEntity>;
}

export class GetTodo implements GetTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(id: number): Promise<TodoEntity> {
    return this.repository.findByID(id);
  }
}
