import { TodoList } from "@/components/todo-list";
import { AddTodo } from "@/components/add-todo";
import { TodoFilters } from "@/components/todo-filters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4 sm:p-8">
      <div className="mx-auto max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Todo List
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <AddTodo />
            <TodoFilters />
            <TodoList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
