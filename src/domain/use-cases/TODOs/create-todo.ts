import { CreateTodoDTO } from "../../DTOs";
import { TodoRepository } from "../../classes/repositories/todo.repository";
import { TodoEntity } from "../../entities/todo.entity";

export interface CreateTodoUseCase {
  execute(dto: CreateTodoDTO): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(dto: CreateTodoDTO): Promise<TodoEntity> {
    return this.repository.create(dto);
  }
}
