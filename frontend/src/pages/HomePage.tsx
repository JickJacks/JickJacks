import { useState } from "react";
import FiltersSidebar from "../components/FiltersSidebar";
import GameCard from "../components/GameCard";
import { topDeals } from "../data/games";
import Header from "../components/Header";

export default function HomePage() {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Header onToggleFilters={() => setFiltersOpen(true)} />
      <main className="mx-auto flex max-w-[1440px] gap-8 px-4 py-6 md:px-8">
        <FiltersSidebar isOpen={filtersOpen} onClose={() => setFiltersOpen(false)} />
        <section className="flex-1">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {topDeals.map((deal) => (
              <GameCard key={deal.id} deal={deal} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
