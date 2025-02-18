import { todos, type Todo, type InsertTodo } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getTodos(): Promise<Todo[]>;
  createTodo(todo: InsertTodo): Promise<Todo>;
  updateTodo(id: number, todo: Partial<InsertTodo>): Promise<Todo>;
  deleteTodo(id: number): Promise<void>;
  reorderTodos(orderedIds: number[]): Promise<Todo[]>;
}

export class DatabaseStorage implements IStorage {
  async getTodos(): Promise<Todo[]> {
    return await db.select().from(todos).orderBy(todos.order);
  }

  async createTodo(insertTodo: InsertTodo): Promise<Todo> {
    const [todo] = await db
      .insert(todos)
      .values(insertTodo)
      .returning();
    return todo;
  }

  async updateTodo(id: number, updates: Partial<InsertTodo>): Promise<Todo> {
    const [todo] = await db
      .update(todos)
      .set(updates)
      .where(eq(todos.id, id))
      .returning();

    if (!todo) {
      throw new Error("Todo not found");
    }

    return todo;
  }

  async deleteTodo(id: number): Promise<void> {
    const [todo] = await db
      .delete(todos)
      .where(eq(todos.id, id))
      .returning();

    if (!todo) {
      throw new Error("Todo not found");
    }
  }

  async reorderTodos(orderedIds: number[]): Promise<Todo[]> {
    // Update orders in a transaction to ensure consistency
    const reorderedTodos = await db.transaction(async (tx) => {
      const updatedTodos = [];
      for (const [index, id] of orderedIds.entries()) {
        const [todo] = await tx
          .update(todos)
          .set({ order: index })
          .where(eq(todos.id, id))
          .returning();

        if (todo) {
          updatedTodos.push(todo);
        }
      }
      return updatedTodos;
    });

    return reorderedTodos;
  }
}

export const storage = new DatabaseStorage();