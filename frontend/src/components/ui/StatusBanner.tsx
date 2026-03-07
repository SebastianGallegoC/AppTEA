"use client";

import { useEffect, useState } from "react";

interface StatusBannerProps {
  type: "success" | "error" | "info";
  message: string;
  visible: boolean;
}

export default function StatusBanner({
  type,
  message,
  visible,
}: StatusBannerProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  const typeClasses: Record<string, string> = {
    success: "bg-exito text-principal border-exito",
    error: "bg-error text-principal border-error",
    info: "bg-resaltado text-principal border-resaltado",
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`rounded-lg border p-4 text-base transition-fade ${
        typeClasses[type]
      } ${show ? "opacity-100" : "opacity-0"}`}
    >
      {message}
    </div>
  );
}
