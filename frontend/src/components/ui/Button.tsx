"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  "aria-label": string;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "btn-3d px-6 py-3 rounded-xl font-bold text-base " +
    "focus-visible:outline-2 focus-visible:outline-resaltado focus-visible:outline-offset-2 " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses =
    variant === "primary"
      ? "btn-3d-primary"
      : variant === "danger"
        ? "btn-3d-danger"
        : "btn-3d-secondary";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
