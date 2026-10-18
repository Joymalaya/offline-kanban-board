import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useKanbanStore } from "@/store/useKanbanStore";
import { Plus } from "lucide-react";

export default function AddTaskDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");

  const addTask = useKanbanStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      id: crypto.randomUUID(),
      title,
      description,
      status: "TODO",
      priority,
    });

    setTitle("");
    setDescription("");
    setPriority("Medium");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* The Upgraded Button: Gradient, rounded pill, soft shadow glow, and an icon */}
        <Button 
          className="gap-2 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all rounded-full px-6 font-semibold border-0"
        >
          <Plus className="h-4 w-4 stroke-[3]" /> 
          New Task
        </Button>
      </DialogTrigger>
      
      {/* Upgraded Modal: softer corners and a crisp header */}
      <DialogContent className="sm:max-w-[425px] rounded-2xl border-border/60 shadow-2xl">
        <DialogHeader className="pb-4 border-b border-border/50">
          <DialogTitle className="text-xl font-bold tracking-tight">Create New Task</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-muted-foreground">Task Title</label>
            <Input 
              placeholder="e.g., Fix navigation bug" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              className="bg-muted/30 focus-visible:ring-indigo-500"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-muted-foreground">Description</label>
            <Textarea 
              placeholder="Add details..." 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="resize-none bg-muted/30 focus-visible:ring-indigo-500 h-24"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-muted-foreground">Priority</label>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-muted/30 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              value={priority}
              onChange={(e) => setPriority(e.target.value as "Low" | "Medium" | "High")}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end">
            <Button 
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 font-semibold transition-colors"
            >
              Save Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}