import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import {
  CreateTodo,
  DeleteTodo,
  GetTodo,
  GetTodos,
  TodoRepository,
  UpdateTodo,
} from "../../domain";

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    try {
      const todos = await new GetTodos(this.todoRepository).execute();
      res.json(todos);
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    try {
      const todo = await new GetTodo(this.todoRepository).execute(id);
      res.json(todo);
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    try {
      const todo = await new CreateTodo(this.todoRepository).execute(
        createTodoDto!
      );
      res.json(todo);
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    try {
      const todo = await new UpdateTodo(this.todoRepository).execute(
        updateTodoDto!
      );
      res.json(todo);
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    
    try {
      const todo = await new DeleteTodo(this.todoRepository).execute(id);
      res.json(todo);
    } catch (error) {
      res.status(400).json({ error });
    }
  };
}
