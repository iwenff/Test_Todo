import React from "react";

interface AlertProps {
  type?: "error" | "info";
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ type = "info", children }) => {
  return (
    <div
      className={`alert alert-${type}`}
      role={type === "error" ? "alert" : "status"}
    >
      {children}
    </div>
  );
};
