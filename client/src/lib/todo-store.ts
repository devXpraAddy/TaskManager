import { create } from "zustand";

type Filter = "all" | "active" | "completed";

interface TodoStore {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  filter: "all",
  setFilter: (filter) => set({ filter }),
}));
