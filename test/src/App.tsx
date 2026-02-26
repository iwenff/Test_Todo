import React from "react";

import { TodoPage } from "./features/todos/ui/TodoPage";
import { AppLayout } from "./App/Layout/AppLayout";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import "./App.css";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppLayout>
        <TodoPage />
      </AppLayout>
    </ThemeProvider>
  );
};
