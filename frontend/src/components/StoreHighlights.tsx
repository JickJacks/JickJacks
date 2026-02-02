import { ShieldCheck, Star } from "lucide-react";

const stores = [
  {
    name: "Instant Gaming",
    rating: 4.8,
    badge: "Official Key",
    description: "Sconti giornalieri e chiavi ufficiali garantite.",
  },
  {
    name: "G2A",
    rating: 4.2,
    badge: "Marketplace",
    description: "Ampia scelta e offerte flash ogni weekend.",
  },
  {
    name: "Eneba",
    rating: 4.5,
    badge: "Top Seller",
    description: "Prezzi competitivi e supporto rapido.",
  },
];

export default function StoreHighlights() {
  return (
    <section className="mt-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-text-primary">Store verificati</h3>
          <p className="mt-1 text-sm text-text-secondary">
            Solo rivenditori con rating elevato e chiavi controllate.
          </p>
        </div>
        <button className="rounded-md border border-border-color px-3 py-2 text-xs font-semibold text-text-secondary">
          Vedi tutti gli store
        </button>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {stores.map((store) => (
          <div
            key={store.name}
            className="rounded-md border border-border-color bg-bg-surface/70 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-text-primary">{store.name}</p>
              <span className="rounded-full bg-success/20 px-2 py-1 text-xs text-success">
                {store.badge}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-text-secondary">
              <Star className="h-4 w-4 text-warning" />
              {store.rating} / 5
              <ShieldCheck className="ml-auto h-4 w-4 text-success" />
            </div>
            <p className="mt-3 text-xs text-text-secondary">{store.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
