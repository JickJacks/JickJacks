import { useEffect, useMemo, useState } from "react";
import FiltersSidebar from "../components/FiltersSidebar";
import GameCard from "../components/GameCard";
import GameCardSkeleton from "../components/GameCardSkeleton";
import Header from "../components/Header";
import { useFilters } from "../context/FilterContext";
import { gamesData } from "../data/gamesData";

const ITEMS_PER_PAGE = 20;

export default function HomePage() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { filterGames, debouncedQuery, selectedPlatforms, selectedGenres, priceRange, yearRange } =
    useFilters();
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredGames = useMemo(() => filterGames(gamesData), [filterGames]);
  const visibleGames = filteredGames.slice(0, visibleCount);

  useEffect(() => {
    setIsLoading(true);
    setVisibleCount(ITEMS_PER_PAGE);
    const handle = window.setTimeout(() => setIsLoading(false), 300);
    return () => window.clearTimeout(handle);
  }, [debouncedQuery, selectedPlatforms, selectedGenres, priceRange, yearRange]);

  if (gamesData.length === 0) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary">
        <Header onToggleFilters={() => setFiltersOpen(true)} />
        <div className="mx-auto max-w-[700px] px-4 py-16 text-center">
          <p className="text-text-secondary">Errore nel caricamento dei dati.</p>
          <button className="mt-4 rounded-md bg-accent-primary px-4 py-2 text-sm font-semibold text-white">
            Riprova
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Header onToggleFilters={() => setFiltersOpen(true)} />
      <main className="mx-auto flex max-w-[1440px] gap-8 px-4 py-6 md:px-8">
        <FiltersSidebar isOpen={filtersOpen} onClose={() => setFiltersOpen(false)} />
        <section className="flex-1">
          <div className="mb-4 text-sm text-text-secondary">
            Showing {filteredGames.length} of {gamesData.length} games
          </div>
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <GameCardSkeleton key={`skeleton-${index}`} />
              ))}
            </div>
          ) : filteredGames.length === 0 ? (
            <div className="rounded-lg border border-border-color bg-bg-surface/70 p-8 text-center text-text-secondary">
              Nessun gioco trovato. Prova con un'altra ricerca.
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {visibleGames.map((deal) => (
                  <GameCard key={deal.id} deal={deal} />
                ))}
              </div>
              {visibleCount < filteredGames.length ? (
                <div className="mt-8 flex justify-center">
                  <button
                    className="rounded-md border border-border-color px-4 py-2 text-sm font-semibold text-text-secondary"
                    onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                    aria-label="Load more games"
                  >
                    Load more
                  </button>
                </div>
              ) : null}
            </>
          )}
        </section>
      </main>
    </div>
  );
}
