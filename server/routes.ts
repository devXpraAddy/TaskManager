import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTodoSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/todos", async (_req, res) => {
    const todos = await storage.getTodos();
    res.json(todos);
  });

  app.post("/api/todos", async (req, res) => {
    const validatedData = insertTodoSchema.parse(req.body);
    const todo = await storage.createTodo(validatedData);
    res.json(todo);
  });

  app.patch("/api/todos/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const validatedData = insertTodoSchema.partial().parse(req.body);
    const todo = await storage.updateTodo(id, validatedData);
    res.json(todo);
  });

  app.delete("/api/todos/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteTodo(id);
    res.status(204).end();
  });

  app.post("/api/todos/reorder", async (req, res) => {
    const schema = z.object({ orderedIds: z.array(z.number()) });
    const { orderedIds } = schema.parse(req.body);
    const todos = await storage.reorderTodos(orderedIds);
    res.json(todos);
  });

  const httpServer = createServer(app);
  return httpServer;
}
