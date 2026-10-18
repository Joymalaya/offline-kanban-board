import React from "react";
import AddTaskDialogue from "./AddTaskDialogue";
// 1. Import the logo from your assets folder
import logo from "../assets/logo.png";

interface NavbarProps {
  toggle: React.ReactNode;
}

export default function Navbar({ toggle }: NavbarProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-card">
      
      {/* 2. Group the logo and the title together */}
      <div className="flex items-center gap-3">
        <img 
          src={logo} 
          alt="Kanban Logo" 
          className="w-8 h-8 rounded-lg shadow-sm" 
        />
        <h1 className="text-xl font-bold tracking-tight">Kanban Board</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <AddTaskDialogue />
        {toggle}
      </div>
    </div>
  );
}