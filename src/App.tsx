import Navbar from "./components/Navbar";
import KanbanBoard from "./components/KanbanBoard";
import TaskStats from "./components/TaskStats"; // <-- Import the new stats
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <Navbar toggle={<ModeToggle />} />
        
        <main className="p-6 max-w-7xl mx-auto space-y-6"> {/* Added space-y-6 for spacing */}
          {/* Add the Stats Header */}
          <TaskStats />
          
          {/* The Drag and Drop Board */}
          <KanbanBoard />
        </main>
      </div>
    </ThemeProvider>
  );
}