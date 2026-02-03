import { Bell, Heart } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PriceComparisonTable from "../components/PriceComparisonTable";
import PriceHistoryChart from "../components/PriceHistoryChart";
import { gamesData } from "../data/gamesData";
import { useWishlist } from "../context/WishlistContext";
import { useSettings } from "../context/SettingsContext";
import { useTranslation } from "../hooks/useTranslation";

export default function GameDetailPage() {
  const { id } = useParams();
  const game = gamesData.find((deal) => deal.id === id);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isProcessing, setIsProcessing] = useState(false);
  const { settings } = useSettings();
  const { t } = useTranslation();

  if (!game) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary">
        <div className="mx-auto max-w-[900px] px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">{t("game_not_found_title")}</h1>
          <p className="mt-2 text-text-secondary">{t("game_not_found_desc")}</p>
        </div>
      </div>
    );
  }

  const bestPrice = [...game.prices].sort((a, b) => a.price - b.price)[0];
  const inWishlist = isInWishlist(game.id);
  const localeMap: Record<typeof settings.language, string> = {
    it: "it-IT",
    en: "en-US",
    es: "es-ES",
    fr: "fr-FR",
  };
  const locale = localeMap[settings.language] ?? "it-IT";
  const releaseLabel = t("game_release_date").replace("{date}", game.releaseDate);
  const storeLabel = t("game_store_label").replace("{store}", bestPrice.store);
  const lastUpdateLabel = t("game_last_update").replace(
    "{date}",
    new Date(bestPrice.lastUpdated).toLocaleDateString(locale)
  );

  const handleWishlistToggle = () => {
    setIsProcessing(true);
    if (inWishlist) {
      removeFromWishlist(game.id);
    } else {
      addToWishlist(game.id);
    }
    window.setTimeout(() => setIsProcessing(false), 400);
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <div className="mx-auto max-w-[1100px] px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className="overflow-hidden rounded-lg border border-border-color bg-bg-surface">
            <img src={game.coverImage} alt={game.title} className="h-full w-full object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-text-primary">{game.title}</h1>
            <p className="mt-3 text-sm text-text-secondary">{game.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {game.platforms.map((platform) => (
                <span
                  key={platform}
                  className="rounded-full border border-border-color px-3 py-1 text-xs text-text-secondary"
                >
                  {platform}
                </span>
              ))}
              {game.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-border-color px-3 py-1 text-xs text-text-secondary"
                >
                  {genre}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-text-muted">{releaseLabel}</p>
            <div className="mt-6 rounded-lg border border-border-color bg-bg-surface/70 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-text-muted">{t("game_best_price")}</p>
                  <p className="font-mono text-2xl text-success">€{bestPrice.price.toFixed(2)}</p>
                  <p className="text-xs text-text-muted">{storeLabel}</p>
                </div>
                <div className="text-right text-xs text-text-muted">
                  {lastUpdateLabel}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  className="flex items-center gap-2 rounded-md border border-border-color px-4 py-2 text-sm text-text-secondary disabled:opacity-60"
                  onClick={handleWishlistToggle}
                  disabled={isProcessing}
                >
                  <Heart className={`h-4 w-4 ${inWishlist ? "fill-error text-error" : ""}`} />
                  {inWishlist ? t("game_remove_wishlist") : t("game_add_wishlist")}
                </button>
                <button className="flex items-center gap-2 rounded-md bg-accent-primary px-4 py-2 text-sm font-semibold text-white">
                  <Bell className="h-4 w-4" /> {t("game_create_alert")}
                </button>
              </div>
            </div>
          </div>
        </div>

        <PriceComparisonTable prices={game.prices} />
        <PriceHistoryChart data={game.priceHistory} />

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-text-primary">{t("game_screenshots")}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {game.screenshots.map((shot) => (
              <img
                key={shot}
                src={shot}
                alt={t("game_screenshot_alt").replace("{title}", game.title)}
                className="h-44 w-full rounded-md border border-border-color object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
