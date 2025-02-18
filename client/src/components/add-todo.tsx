import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTodoSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function AddTodo() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(insertTodoSchema),
    defaultValues: {
      title: "",
      completed: false,
      order: 0,
    },
  });

  const addMutation = useMutation({
    mutationFn: async (data: { title: string; completed: boolean; order: number }) => {
      const res = await apiRequest("POST", "/api/todos", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/todos"] });
      form.reset();
      toast({
        title: "Success",
        description: "Todo added",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add todo",
        variant: "destructive",
      });
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    addMutation.mutate(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex space-x-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Add a new todo..."
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onSubmit();
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
