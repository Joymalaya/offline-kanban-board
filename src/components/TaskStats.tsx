import { useKanbanStore } from "@/store/useKanbanStore";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// @ts-expect-error CSS is handled by the bundler
import "react-circular-progressbar/dist/styles.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ListTodo, Timer } from "lucide-react";

export default function TaskStats() {
  const tasks = useKanbanStore((state) => state.tasks);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "DONE").length;
  const inProgressTasks = tasks.filter((t) => t.status === "IN_PROGRESS").length;

  const percentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
      
      {/* Overall Progress Card */}
      <Card className="md:col-span-1 border-primary/20 bg-gradient-to-b from-primary/10 to-transparent flex flex-col">
        <CardHeader className="pb-2 flex items-center justify-center text-center">
          <CardTitle className="text-sm font-semibold text-muted-foreground tracking-tight uppercase">
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center p-6">
          <div className="w-28 h-28 drop-shadow-lg">
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              styles={buildStyles({
                pathColor: `#6366f1`, 
                textColor: `hsl(var(--foreground))`,
                trailColor: `hsl(var(--muted))`,
                textSize: "22px",
                pathTransitionDuration: 0.5,
              })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary Area */}
      <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <Card className="flex flex-col hover:bg-muted/10 transition-colors">
          {/* Centered header with icon right next to the text */}
          <CardHeader className="flex flex-row items-center justify-center pb-2 space-y-0 gap-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Tasks</CardTitle>
            <div className="p-1.5 bg-blue-500/10 rounded-md">
              <ListTodo className="w-4 h-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center p-4 pt-2">
            {/* The Shaded Box */}
            <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center text-center h-full">
              <div className="text-4xl font-bold tracking-tighter">{totalTasks}</div>
              <p className="text-xs text-muted-foreground mt-1 font-medium">Across all columns</p>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col hover:bg-muted/10 transition-colors">
          <CardHeader className="flex flex-row items-center justify-center pb-2 space-y-0 gap-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            <div className="p-1.5 bg-yellow-500/10 rounded-md">
              <Timer className="w-4 h-4 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center p-4 pt-2">
            <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center text-center h-full">
              <div className="text-4xl font-bold tracking-tighter">{inProgressTasks}</div>
              <p className="text-xs text-muted-foreground mt-1 font-medium">Currently being worked on</p>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col hover:bg-muted/10 transition-colors">
          <CardHeader className="flex flex-row items-center justify-center pb-2 space-y-0 gap-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            <div className="p-1.5 bg-green-500/10 rounded-md">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center p-4 pt-2">
            <div className="bg-muted/30 border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center text-center h-full">
              <div className="text-4xl font-bold tracking-tighter">{completedTasks}</div>
              <p className="text-xs text-muted-foreground mt-1 font-medium">Successfully finished</p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}