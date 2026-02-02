import { ShieldCheck, SlidersHorizontal } from "lucide-react";

const platforms = [
  "PC (1,234)",
  "PlayStation 5 (567)",
  "PlayStation 4 (890)",
  "Xbox Series X|S (432)",
  "Xbox One (654)",
  "Nintendo Switch (987)",
];

const keyTypes = [
  { label: "Chiavi Ufficiali", icon: ShieldCheck },
  { label: "Account Condivisi" },
  { label: "Grey Market" },
];

export default function FiltersSidebar() {
  return (
    <aside className="hidden w-[280px] shrink-0 lg:block">
      <div className="sticky top-28 rounded-lg border border-border-color bg-bg-surface/90 p-6 shadow-md backdrop-blur-xl">
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
                  <input type="checkbox" className="h-4 w-4 accent-accent-primary" />
                  {platform}
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-text-muted">Prezzo</p>
            <div className="mt-3 flex items-center justify-between gap-2">
              <span>€0</span>
              <input type="range" className="w-full accent-accent-primary" />
              <span>€100</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-text-muted">Sconto minimo</p>
            <div className="mt-3 flex items-center justify-between gap-2">
              <span>0%</span>
              <input type="range" className="w-full accent-accent-primary" />
              <span>100%</span>
            </div>
            <p className="mt-2 text-xs text-text-muted">Almeno 50% di sconto</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-text-muted">Tipo chiave</p>
            <div className="mt-3 space-y-2">
              {keyTypes.map(({ label, icon: Icon }) => (
                <label key={label} className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 accent-accent-primary" />
                  {Icon ? <Icon className="h-4 w-4 text-success" /> : null}
                  {label}
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 rounded-md border border-border-color px-3 py-2 text-xs font-semibold text-text-secondary">
              Reset Filtri
            </button>
            <button className="flex-1 rounded-md bg-accent-primary px-3 py-2 text-xs font-semibold text-white">
              Applica (234)
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
