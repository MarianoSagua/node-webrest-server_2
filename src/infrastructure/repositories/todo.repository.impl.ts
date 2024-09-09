import {
  CreateTodoDto,
  TodoDataSource,
  TodoEntity,
  TodoRepository,
  UpdateTodoDto,
} from "../../domain";

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private readonly dataSource: TodoDataSource) {}

  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.dataSource.create(createTodoDto);
  }

  getAll(): Promise<TodoEntity[]> {
    return this.dataSource.getAll();
  }

  findByID(id: number): Promise<TodoEntity> {
    return this.dataSource.findByID(id);
  }

  updateByID(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.dataSource.updateByID(updateTodoDto);
  }

  deleteByID(id: number): Promise<TodoEntity> {
    return this.dataSource.deleteByID(id);
  }
}
