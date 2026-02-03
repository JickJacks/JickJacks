import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { gamesData } from "../data/gamesData";
import { useFilters } from "../context/FilterContext";
import { useTranslation } from "../hooks/useTranslation";

const platforms = [
  "PC",
  "PlayStation 5",
  "PlayStation 4",
  "Xbox Series X|S",
  "Xbox One",
  "Nintendo Switch",
];

const genres = [
  "Action",
  "Adventure",
  "RPG",
  "Strategy",
  "Sports",
  "Racing",
  "Simulation",
  "Horror",
  "Shooter",
  "Sci-Fi",
];

type FiltersSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function FiltersSidebar({ isOpen, onClose }: FiltersSidebarProps) {
  const [advancedOpen, setAdvancedOpen] = useState(true);
  const { t } = useTranslation();
  const {
    selectedPlatforms,
    togglePlatform,
    selectedGenres,
    toggleGenre,
    priceRange,
    setPriceRange,
    releaseYears,
    yearRange,
    setYearRange,
    clearFilters,
  } = useFilters();

  const platformCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    platforms.forEach((platform) => {
      counts[platform] = gamesData.filter((game) => game.platforms.includes(platform)).length;
    });
    return counts;
  }, []);

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
            {t("filters_title")}
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border-color"
            aria-label={t("filters_close")}
          >
            <X className="h-4 w-4 text-text-secondary" />
          </button>
        </div>

        <div className="mt-4 rounded-lg border border-border-color bg-bg-surface/90 p-6 shadow-md backdrop-blur-xl lg:mt-0">
          <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
            <SlidersHorizontal className="h-4 w-4 text-accent-primary" />
            {t("filters_title")}
          </div>

          <div className="mt-6 space-y-6 text-sm text-text-secondary">
            <div>
              <p className="text-xs font-semibold uppercase text-text-muted">{t("filters_platforms")}</p>
              <div className="mt-3 space-y-2">
                {platforms.map((platform) => (
                  <label key={platform} className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        checked={selectedPlatforms.includes(platform)}
                        onChange={() => togglePlatform(platform)}
                      />
                      {platform}
                    </span>
                    <span className="text-xs text-text-muted">{platformCounts[platform]}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-text-muted">{t("filters_price")}</p>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span>€{priceRange.min}</span>
                  <span>€{priceRange.max}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={80}
                  value={priceRange.min}
                  onChange={(event) =>
                    setPriceRange({
                      min: Math.min(Number(event.target.value), priceRange.max),
                      max: priceRange.max,
                    })
                  }
                  className="w-full"
                  aria-label={t("filters_min_price_label")}
                />
                <input
                  type="range"
                  min={0}
                  max={80}
                  value={priceRange.max}
                  onChange={(event) =>
                    setPriceRange({
                      min: priceRange.min,
                      max: Math.max(Number(event.target.value), priceRange.min),
                    })
                  }
                  className="w-full"
                  aria-label={t("filters_max_price_label")}
                />
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-text-muted">{t("filters_genre")}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <label
                    key={genre}
                    className={`rounded-full border px-3 py-1 text-xs transition ${
                      selectedGenres.includes(genre)
                        ? "border-accent-primary bg-accent-primary/20 text-accent-primary"
                        : "border-border-color"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={selectedGenres.includes(genre)}
                      onChange={() => toggleGenre(genre)}
                    />
                    {genre}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-text-muted">{t("filters_release_year")}</p>
              <div className="mt-3 flex gap-2">
                <select
                  className="w-full rounded-md border border-border-color bg-bg-secondary/70 px-3 py-2 text-xs"
                  value={yearRange[0]}
                  onChange={(event) =>
                    setYearRange([Number(event.target.value), yearRange[1]])
                  }
                >
                  {releaseYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  className="w-full rounded-md border border-border-color bg-bg-secondary/70 px-3 py-2 text-xs"
                  value={yearRange[1]}
                  onChange={(event) =>
                    setYearRange([yearRange[0], Number(event.target.value)])
                  }
                >
                  {releaseYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <button
                className="flex w-full items-center justify-between text-xs font-semibold uppercase text-text-muted"
                onClick={() => setAdvancedOpen((prev) => !prev)}
              >
                {t("filters_advanced")}
                <ChevronDown className={`h-4 w-4 transition ${advancedOpen ? "rotate-180" : ""}`} />
              </button>
              {advancedOpen ? (
                <div className="mt-3 space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" />
                    {t("filters_official_keys")}
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" />
                    {t("filters_discount_50")}
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4" />
                    {t("filters_available_now")}
                  </label>
                </div>
              ) : null}
            </div>

            <div className="flex gap-2">
              <button
                className="flex-1 rounded-md border border-border-color px-3 py-2 text-xs font-semibold text-text-secondary"
                onClick={clearFilters}
              >
                {t("filters_clear_all")}
              </button>
              <button className="flex-1 rounded-md bg-accent-primary px-3 py-2 text-xs font-semibold text-white">
                {t("filters_apply")}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
