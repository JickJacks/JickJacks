import { Bell, Heart, X } from "lucide-react";
import type { GameDeal } from "../data/games";

const formatPrice = (price: number) => price.toFixed(2).replace(".", ",");

export default function WishlistSidebar({ items }: { items: GameDeal[] }) {
  return (
    <aside className="hidden w-[320px] shrink-0 xl:block">
      <div className="sticky top-28 rounded-lg border border-border-color bg-bg-surface/90 p-6 shadow-md backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
            <Heart className="h-4 w-4 text-error" />
            La tua wishlist
          </div>
          <button className="flex h-7 w-7 items-center justify-center rounded-md border border-border-color">
            <X className="h-3 w-3 text-text-secondary" />
          </button>
        </div>
        <div className="mt-4 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 rounded-md border border-border-color bg-bg-secondary/50 p-3"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-14 w-12 rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="line-clamp-2 text-sm font-semibold text-text-primary">
                  {item.title}
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs text-text-secondary">
                  <span className="font-mono text-success">
                    €{formatPrice(item.currentPrice)}
                  </span>
                  <span className="text-text-muted">(-{item.discount}%)</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-text-secondary">
                  <Bell className="h-3 w-3" />
                  Alert attivo a €{formatPrice(item.currentPrice - 3)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-md bg-bg-secondary/70 p-4 text-xs text-text-secondary">
          Totale wishlist: <span className="font-semibold text-text-primary">€89,47</span>
          <br />
          Risparmio stimato: <span className="font-semibold text-success">€205,00</span>
        </div>
      </div>
    </aside>
  );
}
