import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export type LayoutContextValue = {
  filtersOpen: boolean;
  openFilters: () => void;
  closeFilters: () => void;
};

export default function Layout() {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const context: LayoutContextValue = {
    filtersOpen,
    openFilters: () => setFiltersOpen(true),
    closeFilters: () => setFiltersOpen(false),
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Header onToggleFilters={context.openFilters} />
      <main>
        <Outlet context={context} />
      </main>
    </div>
  );
}
