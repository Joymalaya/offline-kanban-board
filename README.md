# ⚡ Offline-First Kanban Board

A high-performance, local-first task management workspace built with React, TypeScript, and IndexedDB. Designed for instant interactions, offline resilience, and seamless multi-tab synchronization.

🔗 **[Live Demo on Vercel](offline-kanban-board.vercel.app)**

## ✨ Key Engineering Features

- **Local-First Persistence:** Powered by `Zustand` and `idb-keyval` (IndexedDB) for asynchronous, non-blocking client-side storage that survives page reloads and offline drops.
- **Real-Time Multi-Tab Sync:** Uses the native browser `BroadcastChannel` API and `storage` events to synchronize task movements, creations, deletions, and theme toggles across open tabs in real time.
- **Accessible Drag-and-Drop:** Engineered with `@dnd-kit/core` for smooth, collision-aware card physics across status columns.
- **Live Analytics Dashboard:** Real-time calculation of workflow distribution and completion percentages using `react-circular-progressbar`.
- **Modern SaaS UI/UX:** Built with `Tailwind CSS`, `Shadcn UI`, `Lucide Icons`, and the `Inter` typeface with synchronized Dark/Light mode support.

## 🛠️ Tech Stack

- **Framework:** React + Vite + TypeScript (ES6 Modules)
- **State & Storage:** Zustand, IndexedDB (`idb-keyval`), BroadcastChannel API
- **Styling & UI:** Tailwind CSS, Shadcn UI, Lucide React
- **Interactions:** `@dnd-kit/core`

## 🚀 Running Locally

```bash
git clone [https://github.com/joymalaya/offline-kanban-board.git](https://github.com/joymalaya/offline-kanban-board.git)
cd offline-kanban-board
npm install
npm run dev
