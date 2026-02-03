import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import FiltersSidebar from "../components/FiltersSidebar";
import GameCard from "../components/GameCard";
import GameCardSkeleton from "../components/GameCardSkeleton";
import type { LayoutContextValue } from "../components/Layout";
import { useFilters } from "../context/FilterContext";
import { gamesData } from "../data/gamesData";
import { useTranslation } from "../hooks/useTranslation";

const ITEMS_PER_PAGE = 20;

export default function HomePage() {
  const { filtersOpen, closeFilters } = useOutletContext<LayoutContextValue>();
  const { filterGames, debouncedQuery, selectedPlatforms, selectedGenres, priceRange, yearRange } =
    useFilters();
  const { t } = useTranslation();
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
      <div className="mx-auto max-w-[700px] px-4 py-16 text-center">
        <p className="text-text-secondary">{t("home_error_loading")}</p>
        <button className="mt-4 rounded-md bg-accent-primary px-4 py-2 text-sm font-semibold text-white">
          {t("home_retry")}
        </button>
      </div>
    );
  }

  const showingText = t("home_showing_games")
    .replace("{shown}", filteredGames.length.toString())
    .replace("{total}", gamesData.length.toString());

  return (
    <div className="mx-auto flex max-w-[1440px] gap-8 px-4 py-6 md:px-8">
      <FiltersSidebar isOpen={filtersOpen} onClose={closeFilters} />
      <section className="flex-1">
        <div className="mb-4 text-sm text-text-secondary">
          {showingText}
        </div>
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <GameCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="rounded-lg border border-border-color bg-bg-surface/70 p-8 text-center text-text-secondary">
            {t("home_no_games_found")}
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
                  aria-label={t("home_load_more_label")}
                >
                  {t("home_load_more")}
                </button>
              </div>
            ) : null}
          </>
        )}
      </section>
    </div>
  );
}
