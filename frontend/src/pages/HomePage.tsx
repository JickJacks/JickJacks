import { useEffect, useMemo, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import FiltersSidebar from "../components/FiltersSidebar";
import GameCard from "../components/GameCard";
import GameCardSkeleton from "../components/GameCardSkeleton";
import type { LayoutContextValue } from "../components/Layout";
import { useFilters } from "../context/FilterContext";
import { gamesData } from "../data/gamesData";
import { useTranslation } from "../hooks/useTranslation";
import { fetchGames } from "../services/api";
import { useToast } from "../components/Toast";
import type { Game } from "../types/game";
import { mapApiGameToGame } from "../utils/mapApiGame";

const ITEMS_PER_PAGE = 20;

export default function HomePage() {
  const { filtersOpen, closeFilters } = useOutletContext<LayoutContextValue>();
  const { filterGames, debouncedQuery, selectedPlatforms, selectedGenres, priceRange, yearRange, getApiParams } =
    useFilters();
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [games, setGames] = useState(gamesData.slice(0, ITEMS_PER_PAGE));
  const [total, setTotal] = useState(gamesData.length);
  const [serverUnavailable, setServerUnavailable] = useState(false);
  const requestIdRef = useRef(0);
  const fallbackToastShownRef = useRef(false);

  const filteredGames = useMemo(() => filterGames(gamesData), [filterGames]);
  const visibleGames = serverUnavailable ? filteredGames.slice(0, page * ITEMS_PER_PAGE) : games;

  useEffect(() => {
    let isActive = true;
    const currentRequestId = requestIdRef.current + 1;
    requestIdRef.current = currentRequestId;
    const controller = new AbortController();
    const run = async () => {
      setIsLoading(true);
      try {
        const response = await fetchGames({
          ...getApiParams(),
          page,
          limit: ITEMS_PER_PAGE,
        }, controller.signal);
        if (!isActive || requestIdRef.current !== currentRequestId) return;
        setServerUnavailable(false);
        fallbackToastShownRef.current = false;
        setTotal(response.meta.total);
        const mapped: Game[] = response.items.map((item) => {
          if (typeof item.id !== "number" || typeof item.title !== "string") {
            console.warn("API game schema mismatch.", item);
          }
          return mapApiGameToGame(item, t("api_best_price_store"));
        });
        setGames((prev) => (page === 1 ? mapped : [...prev, ...mapped]));
      } catch (error) {
        if (!isActive || requestIdRef.current !== currentRequestId) return;
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        if (!fallbackToastShownRef.current) {
          showToast(t("api_fallback_banner"), "info");
          fallbackToastShownRef.current = true;
        }
        setServerUnavailable(true);
        setTotal(filteredGames.length);
        setGames(filteredGames.slice(0, page * ITEMS_PER_PAGE));
      } finally {
        if (isActive && requestIdRef.current === currentRequestId) setIsLoading(false);
      }
    };
    run();
    return () => {
      isActive = false;
      controller.abort();
    };
  }, [page, debouncedQuery, selectedPlatforms, selectedGenres, priceRange, yearRange, getApiParams, filteredGames, showToast, t]);

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

  const shownCount = serverUnavailable ? Math.min(filteredGames.length, page * ITEMS_PER_PAGE) : games.length;
  const showingText = t("home_showing_games")
    .replace("{shown}", shownCount.toString())
    .replace("{total}", total.toString());

  return (
    <div className="mx-auto flex max-w-[1440px] gap-8 px-4 py-6 md:px-8">
      <FiltersSidebar isOpen={filtersOpen} onClose={closeFilters} />
      <section className="flex-1">
        {serverUnavailable ? (
          <div className="mb-4 rounded-md border border-border-color bg-bg-surface/70 px-4 py-2 text-xs text-text-secondary">
            {t("api_fallback_banner")}
          </div>
        ) : null}
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
            {page * ITEMS_PER_PAGE < total ? (
              <div className="mt-8 flex justify-center">
                <button
                  className="rounded-md border border-border-color px-4 py-2 text-sm font-semibold text-text-secondary"
                  onClick={() => setPage((prev) => prev + 1)}
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
