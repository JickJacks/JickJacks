import { Bell, Heart, Star, X } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { priceHistory } from "../data/games";

const storeOffers = [
  {
    id: "instant",
    name: "Instant Gaming",
    price: "€14,99",
    rating: "4.8/5",
    type: "Official Key",
    highlight: true,
  },
  { id: "g2a", name: "G2A", price: "€16,49", rating: "4.2/5", type: "Marketplace" },
  { id: "eneba", name: "Eneba", price: "€17,99", rating: "4.0/5", type: "Grey Market" },
];

export default function FeaturedModal() {
  return (
    <section className="mt-16 rounded-lg border border-border-color bg-bg-secondary/80 p-6 shadow-lg backdrop-blur">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-text-primary">Dettaglio gioco (Preview)</h3>
        <button className="flex h-9 w-9 items-center justify-center rounded-md border border-border-color">
          <X className="h-4 w-4 text-text-secondary" />
        </button>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr]">
        <div className="h-[300px] overflow-hidden rounded-md bg-bg-surface">
          <img
            className="h-full w-full object-cover"
            src="https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbd.jpg"
            alt="Cyberpunk 2077"
          />
        </div>
        <div>
          <h4 className="text-2xl font-bold text-text-primary">Cyberpunk 2077: Ultimate Edition</h4>
          <div className="mt-2 flex items-center gap-2 text-sm text-text-secondary">
            <Star className="h-4 w-4 text-warning" /> 8.5/10 Metacritic
          </div>
          <p className="mt-3 text-sm text-text-secondary">
            Night City non dorme mai: esplora ogni distretto, salva la tua crew e
            confronta i prezzi in tempo reale per ottenere il miglior affare.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["PC", "PlayStation 5", "Xbox"].map((platform) => (
              <span
                key={platform}
                className="rounded-full border border-border-color px-3 py-1 text-xs text-text-secondary"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h5 className="text-sm font-semibold uppercase text-text-muted">Storico prezzi</h5>
        <div className="mt-4 h-52 rounded-md border border-border-color bg-bg-surface/70 p-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={priceHistory}>
              <defs>
                <linearGradient id="price" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#13131f",
                  borderColor: "#2d2d44",
                  borderRadius: "8px",
                }}
              />
              <Area type="monotone" dataKey="price" stroke="#6366f1" fill="url(#price)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-8">
        <h5 className="text-sm font-semibold uppercase text-text-muted">Dove comprare</h5>
        <div className="mt-4 grid gap-4">
          {storeOffers.map((offer) => (
            <div
              key={offer.id}
              className={`rounded-md border p-4 ${
                offer.highlight
                  ? "border-accent-secondary bg-gradient-primary/10 shadow-glow"
                  : "border-border-color bg-bg-surface/60"
              }`}
            >
              {offer.highlight ? (
                <span className="mb-2 inline-flex rounded-full bg-yellow-500/20 px-2 py-1 text-xs font-semibold text-yellow-300">
                  🏆 MIGLIOR PREZZO
                </span>
              ) : null}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-text-primary">{offer.name}</p>
                  <p className="text-xs text-text-secondary">⭐ {offer.rating} · {offer.type}</p>
                </div>
                <p className="font-mono text-lg text-success">{offer.price}</p>
              </div>
              <button className="mt-3 w-full rounded-md bg-accent-primary px-3 py-2 text-sm font-semibold text-white">
                Vai all'offerta ➜
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <button className="flex items-center gap-2 rounded-md border border-border-color px-4 py-2 text-sm font-semibold text-text-secondary">
          <Heart className="h-4 w-4" /> Aggiungi a Wishlist
        </button>
        <button className="flex items-center gap-2 rounded-md bg-accent-primary px-4 py-2 text-sm font-semibold text-white">
          <Bell className="h-4 w-4" /> Avvisami a €12,00
        </button>
      </div>
    </section>
  );
}
