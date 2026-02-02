import { ExternalLink, Trophy } from "lucide-react";
import type { GamePrice } from "../types/game";

const formatPrice = (price: number) => price.toFixed(2).replace(".", ",");

const stockLabel: Record<GamePrice["stock"], string> = {
  in_stock: "In Stock",
  out_of_stock: "Out of Stock",
  preorder: "Pre-order",
};

export default function PriceComparisonTable({ prices }: { prices: GamePrice[] }) {
  const sorted = [...prices].sort((a, b) => a.price - b.price);
  const best = sorted[0];

  return (
    <div className="mt-8 rounded-lg border border-border-color bg-bg-surface/70 p-6">
      <h2 className="text-lg font-semibold text-text-primary">Price Comparison</h2>
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
                    Aggiornato {new Date(price.lastUpdated).toLocaleDateString("it-IT")}
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
                  View Deal <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              {isBest ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-success/20 px-2 py-1 text-xs text-success">
                  <Trophy className="h-3 w-3" /> BEST PRICE
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
