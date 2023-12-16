import { UpdateTodoDTO } from "../../DTOs";
import { TodoRepository } from "../../classes/repositories/todo.repository";
import { TodoEntity } from "../../entities/todo.entity";

export interface UpdateTodoUseCase {
  execute(dto: UpdateTodoDTO): Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(dto: UpdateTodoDTO): Promise<TodoEntity> {
    return this.repository.updateByID(dto);
  }
}
