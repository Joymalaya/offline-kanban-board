import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { Trash2 } from "lucide-react" // <-- Import Trash icon
import { useKanbanStore } from "@/store/useKanbanStore" // <-- Import the store

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "Low" | "Medium" | "High";
}

export default function TaskCard({ task }: { task: Task }) {
  // Grab the delete action from the store
  const deleteTask = useKanbanStore((state) => state.deleteTask);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined;

  const getBadgeColor = (priority: string) => {
    if (priority === "High") return "bg-red-500/10 text-red-500 border-red-500/20";
    if (priority === "Medium") return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    return "bg-blue-500/10 text-blue-500 border-blue-500/20";
  };

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes}
      className="cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors z-50 relative group"
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-sm font-medium leading-tight">
            {task.title}
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={getBadgeColor(task.priority)}>
              {task.priority}
            </Badge>
            
            {/* 
              Delete Button: 
              We use onPointerDown with stopPropagation so clicking the trash can 
              doesn't accidentally trigger the drag-and-drop mechanics!
            */}
            <button 
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => deleteTask(task.id)}
              className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 text-xs text-muted-foreground">
        {task.description}
      </CardContent>
    </Card>
  )
}