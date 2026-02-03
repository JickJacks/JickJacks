import { Store } from "lucide-react";
import { Link } from "react-router-dom";
import type { Game } from "../types/game";

const formatPrice = (price: number) => price.toFixed(2).replace(".", ",");

export default function GameCard({ deal }: { deal: Game }) {
  const sortedPrices = [...deal.prices].sort((a, b) => a.price - b.price);
  const bestPrice = sortedPrices[0];

  return (
    <Link
      to={`/game/${deal.id}`}
      className="group overflow-hidden rounded-md border border-border-color bg-bg-surface shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-glow"
    >
      <div className="relative">
        <img
          src={deal.coverImage}
          alt={deal.title}
          className="h-[200px] w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-card" />
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 text-lg font-semibold text-text-primary">
          {deal.title}
        </h3>
        <div className="mt-3 font-mono text-2xl font-semibold text-success">
          €{formatPrice(bestPrice.price)}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {deal.platforms.map((platform) => (
            <span
              key={platform}
              className="rounded-full border border-border-color px-2 py-1 text-xs text-text-secondary"
            >
              {platform}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-text-secondary">
          <Store className="h-4 w-4" />
          {bestPrice.store}
        </div>
      </div>
    </Link>
  );
}
