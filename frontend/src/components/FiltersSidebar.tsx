import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

const platforms = ["PC", "PlayStation 5", "Xbox Series X|S", "Nintendo Switch"];
const genres = ["Action", "RPG", "FPS", "Strategy", "Adventure"];
const years = [2024, 2023, 2022, 2021, 2020];

type FiltersSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function FiltersSidebar({ isOpen, onClose }: FiltersSidebarProps) {
  const [advancedOpen, setAdvancedOpen] = useState(true);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-72 bg-bg-secondary/95 p-6 shadow-lg transition lg:static lg:z-auto lg:h-auto lg:w-[280px] lg:translate-x-0 lg:bg-transparent lg:p-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
            <SlidersHorizontal className="h-4 w-4 text-accent-primary" />
            Filtri
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border-color"
            aria-label="Chiudi filtri"
          >
            <X className="h-4 w-4 text-text-secondary" />
          </button>
        </div>

        <div className="mt-4 rounded-lg border border-border-color bg-bg-surface/90 p-6 shadow-md backdrop-blur-xl lg:mt-0">
          <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
            <SlidersHorizontal className="h-4 w-4 text-accent-primary" />
            Filtri avanzati
          </div>

          <div className="mt-6 space-y-6 text-sm text-text-secondary">
            <div>
              <p className="text-xs font-semibold uppercase text-text-muted">Piattaforme</p>
              <div className="mt-3 space-y-2">
                {platforms.map((platform) => (
                  <label key={platform} className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" />
                    {platform}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-text-muted">Prezzo</p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span>€0</span>
                <input type="range" className="w-full" />
                <span>€100</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-text-muted">Genere</p>
              <div className="mt-3 flex items-center justify-between rounded-md border border-border-color px-3 py-2">
                <span>Seleziona genere</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full border border-border-color px-3 py-1 text-xs"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-text-muted">Anno di uscita</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {years.map((year) => (
                  <button
                    key={year}
                    className="rounded-full border border-border-color px-3 py-1 text-xs"
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <button
                className="flex w-full items-center justify-between text-xs font-semibold uppercase text-text-muted"
                onClick={() => setAdvancedOpen((prev) => !prev)}
              >
                Filtri avanzati
                <ChevronDown className={`h-4 w-4 transition ${advancedOpen ? "rotate-180" : ""}`} />
              </button>
              {advancedOpen ? (
                <div className="mt-3 space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" />
                    Chiavi ufficiali
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" />
                    Solo sconti sopra 50%
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" />
                    Disponibile subito
                  </label>
                </div>
              ) : null}
            </div>

            <div className="flex gap-2">
              <button className="flex-1 rounded-md border border-border-color px-3 py-2 text-xs font-semibold text-text-secondary">
                Reset Filtri
              </button>
              <button className="flex-1 rounded-md bg-accent-primary px-3 py-2 text-xs font-semibold text-white">
                Applica
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
