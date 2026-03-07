"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  "aria-label": string;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "px-5 py-2.5 rounded-lg font-medium text-base transition-fade " +
    "focus-visible:outline-2 focus-visible:outline-resaltado focus-visible:outline-offset-2 " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses =
    variant === "primary"
      ? "bg-principal text-blanco border border-principal hover:opacity-90"
      : "bg-blanco text-principal border border-borde hover:opacity-90";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
