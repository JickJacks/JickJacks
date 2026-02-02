import { useParams } from "react-router-dom";
import { Bell, Heart } from "lucide-react";
import { topDeals } from "../data/games";

export default function GameDetailPage() {
  const { id } = useParams();
  const game = topDeals.find((deal) => deal.id === id);

  if (!game) {
    return (
      <div className="min-h-screen bg-bg-primary text-text-primary">
        <div className="mx-auto max-w-[900px] px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Gioco non trovato</h1>
          <p className="mt-2 text-text-secondary">Controlla l'ID o torna alla home.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <div className="mx-auto max-w-[1100px] px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className="overflow-hidden rounded-lg border border-border-color bg-bg-surface">
            <img src={game.image} alt={game.title} className="h-full w-full object-cover" />
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
            <p className="mt-4 text-xs text-text-muted">Data uscita: {game.releaseDate}</p>
            <div className="mt-6 rounded-lg border border-border-color bg-bg-surface/70 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-text-muted">Miglior prezzo</p>
                  <p className="font-mono text-2xl text-success">€{game.currentPrice.toFixed(2)}</p>
                  <p className="text-xs text-text-muted">Store: {game.store}</p>
                </div>
                <div className="text-right text-xs text-text-muted">
                  Era €{game.originalPrice.toFixed(2)}
                  <br />
                  Sconto {game.discount}%
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <button className="flex items-center gap-2 rounded-md border border-border-color px-4 py-2 text-sm text-text-secondary">
                  <Heart className="h-4 w-4" /> Aggiungi a Wishlist
                </button>
                <button className="flex items-center gap-2 rounded-md bg-accent-primary px-4 py-2 text-sm font-semibold text-white">
                  <Bell className="h-4 w-4" /> Crea Alert Prezzo
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-text-primary">Screenshots</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {game.screenshots.map((shot) => (
              <img
                key={shot}
                src={shot}
                alt={`Screenshot ${game.title}`}
                className="h-44 w-full rounded-md border border-border-color object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
