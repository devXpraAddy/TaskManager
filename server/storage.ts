import { todos, type Todo, type InsertTodo } from "@shared/schema";

export interface IStorage {
  getTodos(): Promise<Todo[]>;
  createTodo(todo: InsertTodo): Promise<Todo>;
  updateTodo(id: number, todo: Partial<InsertTodo>): Promise<Todo>;
  deleteTodo(id: number): Promise<void>;
  reorderTodos(orderedIds: number[]): Promise<Todo[]>;
}

export class MemStorage implements IStorage {
  private todos: Map<number, Todo>;
  private currentId: number;

  constructor() {
    this.todos = new Map();
    this.currentId = 1;
  }

  async getTodos(): Promise<Todo[]> {
    return Array.from(this.todos.values()).sort((a, b) => a.order - b.order);
  }

  async createTodo(insertTodo: InsertTodo): Promise<Todo> {
    const id = this.currentId++;
    const todo: Todo = { ...insertTodo, id };
    this.todos.set(id, todo);
    return todo;
  }

  async updateTodo(id: number, updates: Partial<InsertTodo>): Promise<Todo> {
    const todo = this.todos.get(id);
    if (!todo) throw new Error("Todo not found");
    
    const updatedTodo = { ...todo, ...updates };
    this.todos.set(id, updatedTodo);
    return updatedTodo;
  }

  async deleteTodo(id: number): Promise<void> {
    if (!this.todos.delete(id)) {
      throw new Error("Todo not found");
    }
  }

  async reorderTodos(orderedIds: number[]): Promise<Todo[]> {
    const reorderedTodos: Todo[] = [];
    orderedIds.forEach((id, index) => {
      const todo = this.todos.get(id);
      if (todo) {
        const updatedTodo = { ...todo, order: index };
        this.todos.set(id, updatedTodo);
        reorderedTodos.push(updatedTodo);
      }
    });
    return reorderedTodos;
  }
}

export const storage = new MemStorage();
