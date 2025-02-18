import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTodoStore } from "@/lib/todo-store";

export function TodoFilters() {
  const { filter, setFilter } = useTodoStore();

  return (
    <ToggleGroup
      type="single"
      value={filter}
      onValueChange={(value) => value && setFilter(value)}
      className="justify-center"
    >
      <ToggleGroupItem value="all" aria-label="Toggle all">
        All
      </ToggleGroupItem>
      <ToggleGroupItem value="active" aria-label="Toggle active">
        Active
      </ToggleGroupItem>
      <ToggleGroupItem value="completed" aria-label="Toggle completed">
        Completed
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
