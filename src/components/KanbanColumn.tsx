import { useDroppable } from "@dnd-kit/core";
import TaskCard, { Task } from "./TaskCard";

interface KanbanColumnProps {
  id: "TODO" | "IN_PROGRESS" | "DONE";
  title: string;
  tasks: Task[];
}

export default function KanbanColumn({ id, title, tasks }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div className="bg-muted/20 border-2 border-border/80 dark:border-border/40 p-4 rounded-xl min-h-[500px] flex flex-col shadow-sm">
      <div className="bg-muted/40 border border-border/50 rounded-xl p-3 mb-4 flex items-center justify-center gap-3 text-center shadow-sm">
        <h2 className="font-bold text-lg tracking-tight">{title}</h2>
        <span className="bg-background shadow-sm border px-2.5 py-0.5 rounded-full text-xs font-semibold text-muted-foreground">
          {tasks.length}
        </span>
      </div>

      <div ref={setNodeRef} className="flex-1 flex flex-col gap-3">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="h-full flex-1 border-2 border-dashed border-border/50 rounded-xl flex items-center justify-center p-4">
            <p className="text-sm text-muted-foreground font-medium text-center">Drop tasks here</p>
          </div>
        )}
      </div>
    </div>
  );
}