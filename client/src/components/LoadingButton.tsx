import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isLoading?: boolean;
  children: ReactNode;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  className = "",
  isLoading = false,
  children,
  ...props
}) => {
  return (
    <button className={`btn ${className}`} {...props} disabled={isLoading}>
      {isLoading ? <span className="loading loading-spinner"></span> : null}
      {children}
    </button>
  );
};

export default LoadingButton;
