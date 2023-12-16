import { Router } from "express";
import { TodoRoutes } from "./TODOs/todos.routes";

export class AppRoutes {
  static routes(): Router {
    const router = Router();

    router.use("/api/todos", TodoRoutes.routes());

    return router;
  }
}
