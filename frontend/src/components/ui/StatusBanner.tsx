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
    success: "bg-exito/15 text-principal border-exito/40",
    error: "bg-error/40 text-principal border-error-oscuro/30",
    info: "bg-resaltado/20 text-principal border-resaltado/40",
  };

  const icons: Record<string, string> = {
    success: "✅",
    error: "⚠️",
    info: "ℹ️",
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`flex items-center gap-3 rounded-xl border-2 p-4 text-sm font-medium transition-fade ${
        typeClasses[type]
      } ${show ? "opacity-100" : "opacity-0"}`}
    >
      <span className="text-lg" aria-hidden="true">
        {icons[type]}
      </span>
      {message}
    </div>
  );
}
