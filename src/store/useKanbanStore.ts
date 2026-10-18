import { create } from 'zustand';
import { persist, StateStorage, createJSONStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';
import { Task } from '../components/TaskCard';

const indexedDBStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => (await get(name)) || null,
  setItem: async (name: string, value: string): Promise<void> => await set(name, value),
  removeItem: async (name: string): Promise<void> => await del(name),
};

interface KanbanStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  moveTask: (id: string, newStatus: Task["status"]) => void;
  deleteTask: (id: string) => void; // <-- New Delete Action
}

export const useKanbanStore = create<KanbanStore>()(
  persist(
    (set) => ({
      tasks: [], // We can start with an empty board now!
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      moveTask: (id, newStatus) => 
        set((state) => ({
          tasks: state.tasks.map(t => t.id === id ? { ...t, status: newStatus } : t)
        })),
      deleteTask: (id) => 
        set((state) => ({
          tasks: state.tasks.filter(t => t.id !== id) // Filters out the deleted task
        })),
    }),
    {
      name: 'kanban-storage',
      storage: createJSONStorage(() => indexedDBStorage),
    }
  )
);

// --- THE REAL-TIME MAGIC ---
// This creates an invisible radio channel between all open tabs of your app
const channel = new BroadcastChannel('kanban_sync');

// 1. Listen for messages from OTHER tabs
channel.onmessage = (event) => {
  const currentTasks = useKanbanStore.getState().tasks;
  // Prevent infinite loops by only updating if the data actually changed
  if (JSON.stringify(currentTasks) !== JSON.stringify(event.data)) {
    useKanbanStore.setState({ tasks: event.data });
  }
};

// 2. Broadcast to OTHER tabs whenever THIS tab makes a change
useKanbanStore.subscribe((state) => {
  channel.postMessage(state.tasks);
});