import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select: React.FC<SelectProps> = ({ children, ...rest }) => {
  return (
    <select className="select" {...rest}>
      {children}
    </select>
  );
};
