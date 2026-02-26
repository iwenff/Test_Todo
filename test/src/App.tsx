import React from "react";

import { TodoPage } from "./features/todos/ui/TodoPage";
import { AppLayout } from "./App/Layout/AppLayout";

import "./App.css";
import { ThemeProvider } from "./App/Providers/ThemeProvider";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppLayout>
        <TodoPage />
      </AppLayout>
    </ThemeProvider>
  );
};
