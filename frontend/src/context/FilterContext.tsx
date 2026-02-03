import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Game } from "../types/game";
import useDebounce from "../hooks/useDebounce";
import { fetchFilters } from "../services/api";

const DEFAULT_PRICE_RANGE = { min: 0, max: 80 };

export type PriceRange = typeof DEFAULT_PRICE_RANGE;

type FilterContextValue = {
  searchQuery: string;
  debouncedQuery: string;
  setSearchQuery: (value: string) => void;
  selectedPlatforms: string[];
  availablePlatforms: string[];
  togglePlatform: (platform: string) => void;
  selectedGenres: string[];
  availableGenres: string[];
  toggleGenre: (genre: string) => void;
  priceRange: PriceRange;
  setPriceRange: (range: PriceRange) => void;
  releaseYears: number[];
  yearRange: [number, number];
  setYearRange: (range: [number, number]) => void;
  clearFilters: () => void;
  filterGames: (games: Game[]) => Game[];
  getApiParams: () => Record<string, string | number | undefined>;
};

const FilterContext = createContext<FilterContextValue | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [availablePlatforms, setAvailablePlatforms] = useState<string[]>([]);
  const [availableGenres, setAvailableGenres] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange>(DEFAULT_PRICE_RANGE);
  const [yearRange, setYearRange] = useState<[number, number]>([2016, 2024]);
  const [releaseYears, setReleaseYears] = useState<number[]>(
    Array.from({ length: 9 }, (_, i) => 2016 + i)
  );

  const debouncedQuery = useDebounce(searchQuery, 300).trim().toLowerCase();

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();
    fetchFilters(controller.signal)
      .then((data) => {
        if (!isActive) return;
        if (data.platforms?.length) setAvailablePlatforms(data.platforms);
        if (data.genres?.length) setAvailableGenres(data.genres);
        if (data.years?.length) setReleaseYears(data.years);
        if (data.years?.length) {
          setYearRange([data.years[0], data.years[data.years.length - 1]]);
        }
      })
      .catch((error) => {
        if (!isActive) return;
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.warn("Failed to load filters from API.", error);
      });
    return () => {
      isActive = false;
      controller.abort();
    };
  }, []);

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((item) => item !== platform) : [...prev, platform]
    );
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((item) => item !== genre) : [...prev, genre]
    );
  };

  const clearFilters = () => {
    setSelectedPlatforms([]);
    setSelectedGenres([]);
    setPriceRange(DEFAULT_PRICE_RANGE);
    setYearRange([2016, 2024]);
  };

  const filterGames = useMemo(() => {
    return (games: Game[]) => {
      return games.filter((game) => {
        if (debouncedQuery) {
          const inTitle = game.title.toLowerCase().includes(debouncedQuery);
          const inDescription = game.description.toLowerCase().includes(debouncedQuery);
          const inGenres = game.genres.some((genre) =>
            genre.toLowerCase().includes(debouncedQuery)
          );
          if (!inTitle && !inDescription && !inGenres) {
            return false;
          }
        }

        if (selectedPlatforms.length > 0) {
          const hasPlatform = game.platforms.some((platform) =>
            selectedPlatforms.includes(platform)
          );
          if (!hasPlatform) {
            return false;
          }
        }

        if (selectedGenres.length > 0) {
          const hasGenre = game.genres.some((genre) => selectedGenres.includes(genre));
          if (!hasGenre) {
            return false;
          }
        }

        const bestPrice = Math.min(...game.prices.map((price) => price.price));
        if (bestPrice < priceRange.min || bestPrice > priceRange.max) {
          return false;
        }

        const releaseYear = Number(game.releaseDate.split("-")[0]);
        if (releaseYear < yearRange[0] || releaseYear > yearRange[1]) {
          return false;
        }

        return true;
      });
    };
  }, [debouncedQuery, selectedPlatforms, selectedGenres, priceRange, yearRange]);

  const getApiParams = () => ({
    q: debouncedQuery || undefined,
    platform: selectedPlatforms.length > 0 ? selectedPlatforms.join(",") : undefined,
    genres: selectedGenres.length > 0 ? selectedGenres.join(",") : undefined,
    minPrice: priceRange.min,
    maxPrice: priceRange.max,
    yearFrom: yearRange[0],
    yearTo: yearRange[1],
  });

  const value = {
    searchQuery,
    debouncedQuery,
    setSearchQuery,
    selectedPlatforms,
    availablePlatforms,
    togglePlatform,
    selectedGenres,
    availableGenres,
    toggleGenre,
    priceRange,
    setPriceRange,
    releaseYears,
    yearRange,
    setYearRange,
    clearFilters,
    filterGames,
    getApiParams,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within FilterProvider");
  }
  return context;
}
