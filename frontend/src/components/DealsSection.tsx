import { ChevronDown } from "lucide-react";
import { topDeals } from "../data/games";
import GameCard from "./GameCard";

export default function DealsSection() {
  return (
    <section className="flex-1">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Migliori Sconti della Settimana</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Aggiornati in tempo reale dai negozi verificati.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm text-text-secondary">
          <button className="flex items-center gap-2 rounded-md border border-border-color px-3 py-2">
            Filtra <ChevronDown className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-2 rounded-md border border-border-color px-3 py-2">
            Ordina: Sconto <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {topDeals.map((deal) => (
          <GameCard key={deal.id} deal={deal} />
        ))}
      </div>
    </section>
  );
}
