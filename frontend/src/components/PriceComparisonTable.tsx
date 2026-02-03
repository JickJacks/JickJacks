import { ExternalLink, Trophy } from "lucide-react";
import type { GamePrice } from "../types/game";
import { useSettings } from "../context/SettingsContext";
import { useTranslation } from "../hooks/useTranslation";

const formatPrice = (price: number) => price.toFixed(2).replace(".", ",");

export default function PriceComparisonTable({ prices }: { prices: GamePrice[] }) {
  const { settings } = useSettings();
  const { t } = useTranslation();
  const sorted = [...prices].sort((a, b) => a.price - b.price);
  const best = sorted[0];
  const localeMap: Record<typeof settings.language, string> = {
    it: "it-IT",
    en: "en-US",
    es: "es-ES",
    fr: "fr-FR",
  };
  const locale = localeMap[settings.language] ?? "it-IT";
  const stockLabel: Record<GamePrice["stock"], string> = {
    in_stock: t("stock_in"),
    out_of_stock: t("stock_out"),
    preorder: t("stock_preorder"),
  };

  return (
    <div className="mt-8 rounded-lg border border-border-color bg-bg-surface/70 p-6">
      <h2 className="text-lg font-semibold text-text-primary">{t("price_comparison_title")}</h2>
      <div className="mt-4 space-y-3">
        {sorted.map((price) => {
          const isBest = price.storeId === best.storeId && price.price === best.price;
          return (
            <div
              key={price.storeId}
              className={`flex flex-wrap items-center justify-between gap-4 rounded-md border px-4 py-3 ${
                isBest
                  ? "border-success bg-success/10 text-success"
                  : "border-border-color bg-bg-secondary/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <img src={price.storeLogo} alt={price.store} className="h-6 w-6" />
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {isBest ? "🏆 " : ""}
                    {price.store}
                  </p>
                  <p className="text-xs text-text-muted">
                    {t("price_updated").replace("{date}", new Date(price.lastUpdated).toLocaleDateString(locale))}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <span className="font-mono text-base">€{formatPrice(price.price)}</span>
                <span className="text-xs text-text-secondary">{stockLabel[price.stock]}</span>
                <a
                  href={price.url}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1 rounded-md border border-border-color px-3 py-1 text-xs text-text-secondary"
                >
                  {t("price_view_deal")} <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              {isBest ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-success/20 px-2 py-1 text-xs text-success">
                  <Trophy className="h-3 w-3" /> {t("price_best")}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
