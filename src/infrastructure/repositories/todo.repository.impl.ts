import {
  CreateTodoDTO,
  TodoDataSource,
  TodoEntity,
  TodoRepository,
  UpdateTodoDTO,
} from "../../domain";

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private readonly dataSource: TodoDataSource) {}

  create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
    return this.dataSource.create(createTodoDTO);
  }

  getAll(): Promise<TodoEntity[]> {
    return this.dataSource.getAll();
  }

  findByID(id: number): Promise<TodoEntity> {
    return this.dataSource.findByID(id);
  }

  updateByID(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
    return this.dataSource.updateByID(updateTodoDTO);
  }

  deleteByID(id: number): Promise<TodoEntity> {
    return this.dataSource.deleteByID(id);
  }
}
