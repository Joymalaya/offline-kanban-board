import { useKanbanStore } from "@/store/useKanbanStore";
import KanbanColumn from "./KanbanColumn";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Task } from "./TaskCard";

export default function KanbanBoard() {
  const tasks = useKanbanStore((state) => state.tasks);
  const moveTask = useKanbanStore((state) => state.moveTask);

  const todoTasks = tasks.filter(t => t.status === "TODO");
  const inProgressTasks = tasks.filter(t => t.status === "IN_PROGRESS");
  const doneTasks = tasks.filter(t => t.status === "DONE");

  // This fires exactly when you let go of the mouse button
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // If dropped outside a valid column, do nothing
    if (!over) return; 

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    // Update our offline-first Zustand store!
    moveTask(taskId, newStatus);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <KanbanColumn id="TODO" title="To Do" tasks={todoTasks} />
        <KanbanColumn id="IN_PROGRESS" title="In Progress" tasks={inProgressTasks} />
        <KanbanColumn id="DONE" title="Done" tasks={doneTasks} />
      </div>
    </DndContext>
  );
}