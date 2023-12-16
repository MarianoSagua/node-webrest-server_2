import { Request, Response } from "express";
import { prisma } from "../../data/postgres-data";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/DTOs";

export class TodosController {
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    return res.json(todos);
  };

  public getTodosById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number!!" });

    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });

    todo
      ? res.json(todo)
      : res.status(404).json({
          msg: "User not found!!",
        });
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDTO] = CreateTodoDTO.create(req.body);

    if (error) return res.status(400).json({ error });

    await prisma.todo.create({
      data: createTodoDTO!,
    });

    res.json("Todo Created!!");
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDTO] = UpdateTodoDTO.create({
      ...req.body,
      id,
    });
    if (error) return res.status(400).json({ error });

    const todo = await prisma.todo.findFirst({
      where: { id },
    });

    if (!todo)
      return res.status(400).json({ error: `Todo with id ${id} not found!!` });

    await prisma.todo.update({
      where: { id },
      data: updateTodoDTO!.values,
    });

    res.json("Todo Updated!!");
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });

    if (!todo)
      return res.status(400).json({ error: `Todo with id ${id} not found!!` });

    await prisma.todo.delete({
      where: { id },
    });

    res.json("Todo Eliminated!!");
  };
}