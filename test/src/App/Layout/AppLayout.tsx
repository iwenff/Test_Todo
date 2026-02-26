import React from "react";
import { ThemeToggle } from "../../shared/ui/ThemeToggle";

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">To‑Do List</h1>
        <ThemeToggle />
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
};
