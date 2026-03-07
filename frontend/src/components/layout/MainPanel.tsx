"use client";

interface MainPanelProps {
  children: React.ReactNode;
}

export default function MainPanel({ children }: MainPanelProps) {
  return (
    <section
      aria-label="Editor de lógica"
      className="h-full rounded-lg border border-borde bg-blanco p-6"
    >
      {children}
    </section>
  );
}
