import { Request, Response } from "express";
import { prisma } from "../../data/postgres-data";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/DTOs";
import { TodoRepository } from "../../domain";

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    try {
      const todo = await this.todoRepository.findByID(id);
      res.json(todo);
    } catch (error) {
      res.status(400).json({ msg: "That todo doesn't exist!!" });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDTO] = CreateTodoDTO.create(req.body);
    if (error) return res.status(400).json({ error });

    const todo = await this.todoRepository.create(createTodoDTO!);
    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDTO] = UpdateTodoDTO.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    const updatedTodo = await this.todoRepository.updateByID(updateTodoDTO!);
    return res.json(updatedTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const deletedTodo = await this.todoRepository.deleteByID(id);
    res.json(deletedTodo);
  };
}
