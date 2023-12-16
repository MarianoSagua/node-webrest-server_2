import { TodoRepository } from "../../classes/repositories/todo.repository";
import { TodoEntity } from "../../entities/todo.entity";

export interface DeleteTodoUseCase {
  execute(id: number): Promise<TodoEntity>;
}

export class DeleteTodo implements DeleteTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(id: number): Promise<TodoEntity> {
    return this.repository.deleteByID(id);
  }
}
