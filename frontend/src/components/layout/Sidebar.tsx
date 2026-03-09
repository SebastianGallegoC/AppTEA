"use client";

import { useAppStore } from "@/store/useAppStore";

type ViewMode = "hub" | "theory" | "map" | "exercise";

interface SidebarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onBackToHub: () => void;
}

const NAV_ITEMS: {
  id: ViewMode | "hub";
  label: string;
  icon: string;
  ariaLabel: string;
}[] = [
  {
    id: "hub",
    label: "APRENDER",
    icon: "🏠",
    ariaLabel: "Ir a la pantalla de selección de módulos",
  },
  {
    id: "map",
    label: "NIVELES",
    icon: "🗺️",
    ariaLabel: "Ver el mapa de niveles del módulo actual",
  },
  {
    id: "theory",
    label: "TEORÍA",
    icon: "📖",
    ariaLabel: "Ver la sección de teoría del módulo actual",
  },
  {
    id: "exercise",
    label: "PRACTICAR",
    icon: "🎯",
    ariaLabel: "Ir al ejercicio del nivel actual",
  },
];

export default function Sidebar({
  currentView,
  onNavigate,
  onBackToHub,
}: SidebarProps) {
  const { currentModuleId, isDarkMode, toggleDarkMode } = useAppStore();
  const hasModule = !!currentModuleId;

  return (
    <>
      {/* Sidebar desktop */}
      <nav
        aria-label="Navegación principal"
        className="hidden lg:flex lg:flex-col lg:w-56 lg:fixed lg:inset-y-0 lg:left-0 lg:z-20 lg:border-r-2 lg:border-borde lg:bg-sidebar lg:px-3 lg:py-6"
      >
        {/* Logo */}
        <div className="mb-8 px-3">
          <h1 className="text-2xl font-extrabold text-acento tracking-tight">
            AppTEA
          </h1>
        </div>

        {/* Nav items */}
        <ul className="flex-1 space-y-1" role="list">
          {NAV_ITEMS.map((item) => {
            const isActive = currentView === item.id;
            const isDisabled = item.id !== "hub" && !hasModule;

            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    if (item.id === "hub") {
                      onBackToHub();
                    } else {
                      onNavigate(item.id as ViewMode);
                    }
                  }}
                  disabled={isDisabled}
                  aria-label={item.ariaLabel}
                  aria-current={isActive ? "page" : undefined}
                  className={`sidebar-item w-full ${isActive ? "active" : ""} ${
                    isDisabled ? "opacity-40 cursor-not-allowed" : ""
                  }`}
                >
                  <span className="text-xl" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Dark mode toggle */}
        <div className="mt-auto space-y-2 px-1">
          <button
            onClick={toggleDarkMode}
            aria-label={
              isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
            }
            className="sidebar-item w-full"
          >
            <span className="text-xl" aria-hidden="true">
              {isDarkMode ? "☀️" : "🌙"}
            </span>
            <span>{isDarkMode ? "Modo claro" : "Modo oscuro"}</span>
          </button>
        </div>
      </nav>

      {/* Bottom bar mobile */}
      <nav
        aria-label="Navegación principal"
        className="lg:hidden fixed bottom-0 inset-x-0 z-20 border-t-2 border-borde bg-sidebar"
      >
        <ul className="flex justify-around py-2" role="list">
          {NAV_ITEMS.map((item) => {
            const isActive = currentView === item.id;
            const isDisabled = item.id !== "hub" && !hasModule;

            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    if (item.id === "hub") {
                      onBackToHub();
                    } else {
                      onNavigate(item.id as ViewMode);
                    }
                  }}
                  disabled={isDisabled}
                  aria-label={item.ariaLabel}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? "text-acento"
                      : isDisabled
                        ? "text-texto-suave opacity-40"
                        : "text-texto-suave"
                  }`}
                >
                  <span className="text-xl" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="text-[10px]">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
