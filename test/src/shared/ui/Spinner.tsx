import React from "react";

export const Spinner: React.FC = () => {
  return (
    <div
      className="spinner"
      role="status"
      aria-live="polite"
      aria-label="Загрузка"
    >
      <span className="spinner-circle" />
    </div>
  );
};
