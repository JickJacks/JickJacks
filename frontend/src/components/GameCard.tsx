import { Store } from "lucide-react";
import { Link } from "react-router-dom";
import type { GameDeal } from "../data/games";

const formatPrice = (price: number) => price.toFixed(2).replace(".", ",");

export default function GameCard({ deal }: { deal: GameDeal }) {
  return (
    <Link
      to={`/game/${deal.id}`}
      className="group overflow-hidden rounded-md border border-border-color bg-bg-surface shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-glow"
    >
      <div className="relative">
        <img
          src={deal.image}
          alt={deal.title}
          className="h-[200px] w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-card" />
        <div
          className={`absolute right-3 top-3 rounded-md px-3 py-1 text-sm font-bold text-white ${
            deal.discount >= 70 ? "bg-hot-deal shadow-hot animate-pulse-glow" : "bg-success"
          }`}
        >
          -{deal.discount}%
        </div>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 text-lg font-semibold text-text-primary">
          {deal.title}
        </h3>
        <div className="mt-3 font-mono text-2xl font-semibold text-success">
          €{formatPrice(deal.currentPrice)}
        </div>
        <div className="text-sm text-text-muted">
          Era: €{formatPrice(deal.originalPrice)} (-{deal.discount}%)
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
          {deal.store}
        </div>
      </div>
    </Link>
  );
}
